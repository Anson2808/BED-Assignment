const { getConnection, sql } = require('../config/db');

// POST a new order (member checkout).
// Body: { customerId, pmtType, items: [{ itemCode, quantity }] }
// The schema allows one stall per order, so a mixed-stall cart is split
// into one CustOrder per stall. Prices are read from MenuItem, not the client.
async function createOrder(req, res) {
  const { customerId, pmtType, items } = req.body;

  if (!customerId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'customerId and a non-empty items array are required' });
  }
  if (!['Cash', 'NETS', 'PayNow'].includes(pmtType)) {
    return res.status(400).json({ error: 'pmtType must be Cash, NETS or PayNow' });
  }
  for (const item of items) {
    if (!parseInt(item.itemCode) || !parseInt(item.quantity) || item.quantity <= 0) {
      return res.status(400).json({ error: 'Each item needs an itemCode and a quantity above 0' });
    }
  }

  let transaction;
  try {
    const pool = await getConnection();

    // Look up the real stall + price for every item in the cart
    const codes = items.map(i => parseInt(i.itemCode));
    const lookup = await pool.request().query(`
      SELECT ItemCode, StallID, ItemPrice
      FROM MenuItem
      WHERE ItemCode IN (${codes.join(',')})
    `);

    const menuByCode = {};
    lookup.recordset.forEach(row => { menuByCode[row.ItemCode] = row; });

    const missing = codes.filter(code => !menuByCode[code]);
    if (missing.length > 0) {
      return res.status(400).json({ error: `Unknown item codes: ${missing.join(', ')}` });
    }

    // Group cart items by stall (one CustOrder per stall)
    const itemsByStall = {};
    for (const item of items) {
      const menuRow = menuByCode[parseInt(item.itemCode)];
      if (!itemsByStall[menuRow.StallID]) itemsByStall[menuRow.StallID] = [];
      itemsByStall[menuRow.StallID].push({
        itemCode: menuRow.ItemCode,
        quantity: parseInt(item.quantity),
        unitPrice: menuRow.ItemPrice
      });
    }

    transaction = new sql.Transaction(pool);
    await transaction.begin();

    const orderIds = [];
    for (const stallId of Object.keys(itemsByStall)) {
      const orderResult = await new sql.Request(transaction)
        .input('customerId', sql.Int, customerId)
        .input('stallId', sql.Int, stallId)
        .input('pmtType', sql.VarChar(30), pmtType)
        .query(`
          INSERT INTO CustOrder (CustomerID, StallID, PmtType)
          OUTPUT INSERTED.OrderID
          VALUES (@customerId, @stallId, @pmtType)
        `);
      const orderId = orderResult.recordset[0].OrderID;
      orderIds.push(orderId);

      for (const line of itemsByStall[stallId]) {
        await new sql.Request(transaction)
          .input('orderId', sql.Int, orderId)
          .input('itemCode', sql.Int, line.itemCode)
          .input('quantity', sql.Int, line.quantity)
          .input('unitPrice', sql.Decimal(6, 2), line.unitPrice)
          .query(`
            INSERT INTO OrderItem (OrderID, ItemCode, Quantity, UnitPrice)
            VALUES (@orderId, @itemCode, @quantity, @unitPrice)
          `);
      }
    }

    await transaction.commit();
    res.status(201).json({ orderIds, message: 'Order saved' });
  } catch (err) {
    console.error(err);
    if (transaction) {
      try { await transaction.rollback(); } catch (rollbackErr) { console.error(rollbackErr); }
    }
    res.status(500).json({ error: 'Failed to save order' });
  }
}

// GET a customer's order history, newest first, with items nested per order
async function getOrderHistory(req, res) {
  try {
    const { customerId } = req.params;
    const pool = await getConnection();

    const result = await pool.request()
      .input('customerId', sql.Int, customerId)
      .query(`
        SELECT
          co.OrderID,
          co.OrderDate,
          co.PmtType,
          fs.StallName,
          mi.ItemDesc,
          oi.Quantity,
          oi.UnitPrice
        FROM CustOrder co
        JOIN FoodStall fs ON co.StallID = fs.StallID
        JOIN OrderItem oi ON co.OrderID = oi.OrderID
        JOIN MenuItem mi ON oi.ItemCode = mi.ItemCode
        WHERE co.CustomerID = @customerId
        ORDER BY co.OrderDate DESC, co.OrderID DESC
      `);

    // Reshape the flat rows into orders with an items array
    const orders = [];
    const orderById = {};
    for (const row of result.recordset) {
      if (!orderById[row.OrderID]) {
        orderById[row.OrderID] = {
          orderId: row.OrderID,
          orderDate: row.OrderDate,
          pmtType: row.PmtType,
          stallName: row.StallName,
          items: [],
          total: 0
        };
        orders.push(orderById[row.OrderID]);
      }
      const order = orderById[row.OrderID];
      order.items.push({
        itemDesc: row.ItemDesc,
        quantity: row.Quantity,
        unitPrice: row.UnitPrice
      });
      order.total += row.Quantity * row.UnitPrice;
    }

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
}

module.exports = { createOrder, getOrderHistory };
