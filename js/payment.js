document.addEventListener('DOMContentLoaded', () => {
    const paymentTotal = document.getElementById('payment-total');
    const paymentForm = document.getElementById("payment-form");
    const message = document.getElementById("message");

    // 1. Calculate and display Total
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0);
    if (paymentTotal) paymentTotal.textContent = `$${total.toFixed(2)}`;

    // 2. Handle Payment Submission
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
        });
    }
});