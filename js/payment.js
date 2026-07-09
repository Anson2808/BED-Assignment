// Checkout now saves orders to the backend database for registered
// customers, or to localStorage for guests.
var API_BASE = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    const paymentTotal = document.getElementById('payment-total');
    const paymentForm = document.getElementById("payment-form");
    const message = document.getElementById("message");
    const orderingAs = document.getElementById("ordering-as");

    // 1. Calculate and display Total
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0);
    if (paymentTotal) paymentTotal.textContent = `$${total.toFixed(2)}`;

    // 2. Load registered customers from the backend for the "Ordering As" dropdown
    fetch(API_BASE + '/customers')
        .then(response => response.json())
        .then(customers => {
            customers.forEach(customer => {
                const option = document.createElement('option');
                option.value = customer.CustID;
                option.textContent = customer.CustName + ' (member)';
                orderingAs.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Could not load customers:', error);
        });

    // 3. Handle Payment Submission
    if (paymentForm) {
        paymentForm.addEventListener("submit", function(e) {
            e.preventDefault();


            const name = document.getElementById("name").value.trim();
            const card = document.getElementById("card").value.replace(/\s+/g, ''); // Removes spaces
            const expiryInput = document.getElementById("expiry").value.trim();
            const cvv = document.getElementById("cvv").value.trim();


            const cleanExpiry = expiryInput.replace('/', '');

            // Validation Check:
            // Card must be 16 digits, CVV 3 digits, and Expiry must now be 4 digits (MMYY)
            if (name === "" || card.length !== 16 || cleanExpiry.length !== 4 || cvv.length !== 3) {
                message.style.color = "red";
                message.textContent = "Error: Please check your details. Card: 16 digits, Expiry: MMYY (4 digits), CVV: 3 digits.";
                return;
            }

            if (cart.length === 0) {
                message.style.color = "red";
                message.textContent = "Error: Your cart is empty.";
                return;
            }

            const pmtType = document.getElementById("pmt-type").value;
            const customerId = orderingAs.value;

            if (customerId === 'guest') {
                saveGuestOrder(cart, pmtType, total);
                showSuccessAndRedirect();
            } else {
                saveMemberOrder(cart, pmtType, customerId);
            }
        });
    }

    // Save the order into the database through the backend API
    function saveMemberOrder(cart, pmtType, customerId) {
        // Only items added from the stalls page carry a database ItemCode
        const orderItems = cart
            .filter(item => item.itemCode)
            .map(item => ({ itemCode: item.itemCode, quantity: item.quantity }));

        if (orderItems.length === 0) {
            message.style.color = "red";
            message.textContent = "Error: Your cart items are from an older version of the site. Please clear your cart and add them again from the stall page.";
            return;
        }

        fetch(API_BASE + '/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerId: parseInt(customerId),
                pmtType: pmtType,
                items: orderItems
            })
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Server returned ' + response.status);
                    });
                }
                return response.json();
            })
            .then(() => {
                showSuccessAndRedirect();
            })
            .catch(error => {
                console.error('Failed to save order:', error);
                message.style.color = "red";
                message.textContent = "Error: Could not save your order (" + error.message + "). Your cart has not been cleared.";
            });
    }

    // Guests keep their order history in this browser's localStorage
    function saveGuestOrder(cart, pmtType, total) {
        let history = [];
        try {
            history = JSON.parse(localStorage.getItem('guestOrderHistory')) || [];
        } catch (err) {
            history = [];
        }

        history.push({
            orderedAt: new Date().toISOString(),
            pmtType: pmtType,
            items: cart,
            total: total
        });

        localStorage.setItem('guestOrderHistory', JSON.stringify(history));
    }

    function showSuccessAndRedirect() {
        // --- SUCCESS ACTION ---
        // Display success message at the top
        message.innerHTML = `
            <div style="background-color: #d4edda; color: #155724; padding: 20px; border-radius: 8px; border: 1px solid #c3e6cb; margin-bottom: 20px; font-size: 1.2rem;">
                <strong>Payment Successful!</strong><br>Redirecting to Dashboard...
            </div>`;

        // Hide the form to prevent double-clicking
        paymentForm.style.display = "none";
        document.querySelector('.order-summary').style.display = "none";

        // Clear Cart & Redirect
        localStorage.removeItem('shoppingCart');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }
});
