window.addEventListener('DOMContentLoaded', function() {
    
 
    setupCartButtons();
    setupNavigation();
    updateFooterYear();
    
    console.log('Stalls page loaded successfully!');
});

function setupCartButtons() {
    const cartButtons = document.querySelectorAll('.btn-cart');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-item');
            // Ensure we grab the price (default to 0 if not found)
            const itemPrice = parseFloat(this.getAttribute('data-price')) || 0;
            
            addToCart(itemName, itemPrice);
        });
    });
}




function setupNavigation() {
    var knowMoreButtons = document.querySelectorAll('.btn-know');
    var viewMenuBtn = document.getElementById('scroll-to-menu');
    var menuTarget = document.getElementById('full-menu');

    function scrollToMenu() {
        if (menuTarget) {
            menuTarget.scrollIntoView({ behavior: 'smooth' });
            console.log("Discovery Navigation: Guided user to full menu.");
        }
    }

    knowMoreButtons.forEach(function(btn) {
        btn.addEventListener('click', scrollToMenu);
    });

    if (viewMenuBtn) {
        viewMenuBtn.addEventListener('click', scrollToMenu);
    }
}

function updateFooterYear() {
    var yearElement = document.querySelector('.footer-year');
    
    if (yearElement) {
        var currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}
function addToCart(itemName, price) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    alert(`${itemName} added to cart!`);
}