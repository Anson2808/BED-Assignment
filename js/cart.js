document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
const checkoutBtn = document.getElementById('checkout-btn');

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        
        if (!checkoutBtn.disabled) {
           
            window.location.href = 'payment.html';
        }
    });
}
function renderCart() {
    const cartListContainer = document.getElementById('cart-items-list');
    const totalDisplay = document.getElementById('total-display');
    const checkoutBtn = document.getElementById('checkout-btn');
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    cartListContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartListContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalDisplay.innerText = "0.00";
        return;
    }

    cart.forEach((item, index) => {
    
const itemHTML = `
    <div class="cart-item">
        <input type="checkbox" class="item-select" value="${item.price * item.quantity}" data-index="${index}">
        <div class="item-details">
            <h3>${item.name}</h3>
            <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        <div class="quantity-controls">
            <button class="qty-btn" onclick="changeQuantity(${index}, -1)">−</button>
            <span class="qty-number">${item.quantity}</span>
            <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">
            <span>&times;</span> Remove
        </button>
    </div>
`;
        cartListContainer.innerHTML += itemHTML;
    });

    attachCheckboxListeners();
}

function changeQuantity(index, delta) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    cart[index].quantity += delta;

   
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    renderCart(); 
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    renderCart();
}

function attachCheckboxListeners() {
    const allItemCheckboxes = document.querySelectorAll('.item-select');
    const selectAllCheckbox = document.getElementById('select-all');
    const totalDisplay = document.getElementById('total-display');
    const checkoutBtn = document.getElementById('checkout-btn');

    function updateTotal() {
        let total = 0;
        let count = 0;
        allItemCheckboxes.forEach(box => {
            if (box.checked) {
                total += parseFloat(box.value);
                count++;
            }
        });
        totalDisplay.innerText = total.toFixed(2);
        checkoutBtn.innerText = `Checkout (${count} items)`;
        checkoutBtn.disabled = count === 0;
    }

    allItemCheckboxes.forEach(box => {
        box.addEventListener('change', updateTotal);
    });

    if (selectAllCheckbox) {
        selectAllCheckbox.onclick = () => {
            allItemCheckboxes.forEach(box => box.checked = selectAllCheckbox.checked);
            updateTotal();
        };
    }
}