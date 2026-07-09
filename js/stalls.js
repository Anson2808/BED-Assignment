// Stall details and menu now come from the backend database
var API_BASE = 'http://localhost:3000/api';

// The stall shown on this page. Defaults to stall 1, but explore-menu
// links here with ?id=<stallId> to show other stalls.
var currentStall = null;

window.addEventListener('DOMContentLoaded', function() {

    loadStall();
    setupNavigation();
    updateFooterYear();

    console.log('Stalls page loaded successfully!');
});

// Read the stall id from the URL (?id=3), or use stall 1 as default
function getStallIdFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = parseInt(urlParams.get('id'));
    if (!id || id < 1) {
        id = 1;
    }
    return id;
}

// Fetch the stall and its menu from the backend
function loadStall() {
    var stallId = getStallIdFromUrl();

    fetch(API_BASE + '/stalls/' + stallId)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Server returned ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            currentStall = data.stall;
            document.getElementById('stallTitle').textContent = data.stall.StallName;
            document.title = 'HawkerSG | ' + data.stall.StallName;
            renderFeatured(data.menu);
            renderMenu(data.menu);
        })
        .catch(function(error) {
            console.error('Failed to load stall:', error);
            document.getElementById('stallTitle').textContent = 'Could not load stall';
            document.getElementById('menuTableBody').innerHTML =
                '<tr><td colspan="4">Could not load the menu. Make sure the backend server is running (npm run dev in hawker-backend).</td></tr>';
        });
}

// Show the first two available dishes as featured posts
function renderFeatured(menu) {
    var featuredSection = document.getElementById('featuredSection');
    featuredSection.innerHTML = '';

    var available = menu.filter(function(item) { return item.IsAvailable; });
    var featured = available.slice(0, 2);

    featured.forEach(function(item, index) {
        var post = document.createElement('div');
        post.className = 'featured-post';
        post.innerHTML =
            '<div class="post-badge">Top Rated Food #' + (index + 1) + '</div>' +
            '<h3>' + item.ItemDesc + ', $' + item.ItemPrice.toFixed(2) + '</h3>' +
            '<div class="btn-group">' +
                '<button class="btn-know">Know More</button>' +
                '<button class="btn-cart" data-item-code="' + item.ItemCode + '"' +
                    ' data-item="' + item.ItemDesc + '" data-price="' + item.ItemPrice + '">Add To Cart</button>' +
            '</div>';
        featuredSection.appendChild(post);
    });

    setupCartButtons(featuredSection);
    setupNavigation();
}

// Build the full menu table from the database rows
function renderMenu(menu) {
    var tableBody = document.getElementById('menuTableBody');
    tableBody.innerHTML = '';

    if (menu.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">This stall has no menu items yet.</td></tr>';
        return;
    }

    menu.forEach(function(item) {
        var row = document.createElement('tr');

        var actionCell;
        if (item.IsAvailable) {
            actionCell = '<button class="btn-cart" data-item-code="' + item.ItemCode + '"' +
                ' data-item="' + item.ItemDesc + '" data-price="' + item.ItemPrice + '">Add</button>';
        } else {
            actionCell = '<button class="btn-cart" disabled>Sold Out</button>';
        }

        row.innerHTML =
            '<td>' + item.ItemDesc + '</td>' +
            '<td>' + item.ItemCategory + '</td>' +
            '<td>$' + item.ItemPrice.toFixed(2) + '</td>' +
            '<td>' + actionCell + '</td>';

        tableBody.appendChild(row);
    });

    setupCartButtons(tableBody);
}

function setupCartButtons(container) {
    var cartButtons = container.querySelectorAll('.btn-cart:not([disabled])');

    cartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var itemCode = parseInt(this.getAttribute('data-item-code'));
            var itemName = this.getAttribute('data-item');
            var itemPrice = parseFloat(this.getAttribute('data-price')) || 0;

            addToCart(itemCode, itemName, itemPrice);
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

// Cart items carry the database ItemCode and stall info so checkout
// can save the order into the database.
function addToCart(itemCode, itemName, price) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    const existingItem = cart.find(item => item.itemCode === itemCode);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            itemCode: itemCode,
            name: itemName,
            price: price,
            quantity: 1,
            stallId: currentStall ? currentStall.StallID : null,
            stallName: currentStall ? currentStall.StallName : ''
        });
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    alert(`${itemName} added to cart!`);
}
