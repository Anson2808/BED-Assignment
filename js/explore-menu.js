// Dishes now come from the backend database instead of a hardcoded array
var API_BASE = 'http://localhost:3000/api';

var allDishes = [];

// Work out the price range bucket used by the price filter
function getPriceRange(price) {
    if (price < 5) return 'budget';
    if (price < 8) return 'mid';
    return 'premium';
}

// Map a cuisine name from the database to the filter values used on this page
function getCuisineValue(cuisineDesc) {
    var cuisine = cuisineDesc.toLowerCase();
    if (cuisine === 'beverages') return 'drinks';
    return cuisine;
}

// Load all dishes from the backend API
function loadDishes() {
    fetch(API_BASE + '/menu')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Server returned ' + response.status);
            }
            return response.json();
        })
        .then(function(menuItems) {
            // Convert each database row into the dish shape this page uses
            allDishes = menuItems.map(function(item) {
                return {
                    id: item.ItemCode,
                    dishName: item.ItemDesc,
                    stallName: item.StallName,
                    stallId: item.StallID,
                    cuisine: getCuisineValue(item.CuisineDesc),
                    price: item.ItemPrice,
                    priceRange: getPriceRange(item.ItemPrice),
                    image: null,
                    rating: item.StallRating ? Math.round(item.StallRating * 10) / 10 : 'New',
                    description: item.ItemCategory + ' dish from ' + item.StallName +
                        (item.IsAvailable ? '' : ' (currently sold out)'),
                    tags: item.IsAvailable ? [item.ItemCategory] : [item.ItemCategory, 'Sold Out']
                };
            });

            displayDishes(allDishes);

            // Apply a search term passed in the URL (e.g. from the dashboard search box)
            var urlParams = new URLSearchParams(window.location.search);
            var searchTerm = urlParams.get('search');
            if (searchTerm) {
                document.getElementById('searchInput').value = searchTerm;
                searchDishes();
            }
        })
        .catch(function(error) {
            console.error('Failed to load menu:', error);
            var grid = document.getElementById('dishesGrid');
            grid.innerHTML = '<p>Could not load the menu. Make sure the backend server is running (npm run dev in hawker-backend).</p>';
        });
}


// display dishes on page
function displayDishes(dishes) {
    var grid = document.getElementById('dishesGrid');
    var noResults = document.getElementById('noResults');

    // Clear the grid
    grid.innerHTML = '';

    // Check if no dishes
    if (dishes.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    // Show the grid
    grid.style.display = 'grid';
    noResults.style.display = 'none';

    // card for each dish
    for (var i = 0; i < dishes.length; i++) {
        var dish = dishes[i];
        var card = createDishCard(dish);
        grid.innerHTML = grid.innerHTML + card;
    }
}


// html for each card/food/dish
function createDishCard(dish) {
    // Create tags HTML
    var tagsHTML = '';
    for (var i = 0; i < dish.tags.length; i++) {
        tagsHTML += '<span class="tag">' + dish.tags[i] + '</span>';
    }

    // Get cuisine display name
    var cuisineName = getCuisineName(dish.cuisine);

    // create img section for card
    var imageHTML = '';
    if (dish.image) {
        imageHTML = '<img src="' + dish.image + '" alt="' + dish.dishName + '">';
    } else {
        imageHTML = '<span style="font-size: 4em;">🍽️</span>';
    }

    var priceDisplay = '$' + dish.price.toFixed(2);

    // form the card html
    var html =
        '<div class="dish-card">' +
            '<div class="dish-image">' +
                '<div class="dish-rating">' + dish.rating + ' ★ </div>' +
                '<div class="dish-price-badge">' + priceDisplay + '</div>' +
                imageHTML +
            '</div>' +
            '<div class="dish-content">' +
                '<h3 class="dish-name">' + dish.dishName + '</h3>' +
                '<p class="dish-stall-name">from <strong>' + dish.stallName + '</strong></p>' +
                '<span class="dish-cuisine">' + cuisineName + '</span>' +
                '<p class="dish-description">' + dish.description + '</p>' +
                '<div class="dish-tags">' +
                    '<div class="dish-tags-title">Tags:</div>' +
                    tagsHTML +
                '</div>' +
                '<div class="dish-actions">' +
                    '<button class="visit-stall-btn-full" onclick="visitStall(' + dish.stallId + ')">Visit The Stall!</button>' +
                '</div>' +
            '</div>' +
        '</div>';

    return html;
}


function getCuisineName(cuisine) {
    if (cuisine === 'chinese') return 'Chinese';
    if (cuisine === 'malay') return 'Malay';
    if (cuisine === 'indian') return 'Indian';
    if (cuisine === 'western') return 'Western';
    if (cuisine === 'drinks') return 'Drinks & Desserts';
    return cuisine;
}


// searching function
function searchDishes() {
    var searchInput = document.getElementById('searchInput');
    var searchTerm = searchInput.value.toLowerCase();

    if (searchTerm === '') {
        displayDishes(allDishes);
        return;
    }

    var results = [];

    for (var i = 0; i < allDishes.length; i++) {
        var dish = allDishes[i];

        var nameMatch = dish.dishName.toLowerCase().indexOf(searchTerm) !== -1;

        var stallMatch = dish.stallName.toLowerCase().indexOf(searchTerm) !== -1;

        var descMatch = dish.description.toLowerCase().indexOf(searchTerm) !== -1;

        var tagMatch = false;
        for (var j = 0; j < dish.tags.length; j++) {
            if (dish.tags[j].toLowerCase().indexOf(searchTerm) !== -1) {
                tagMatch = true;
                break;
            }
        }

        // add to results if results found
        if (nameMatch || stallMatch || descMatch || tagMatch) {
            results.push(dish);
        }
    }
    displayDishes(results);
}


// filter
function filterByCuisine() {
    var select = document.getElementById('cuisineFilter');
    var cuisine = select.value;

    var priceSelect = document.getElementById('priceFilter');
    var priceRange = priceSelect.value;

    if (cuisine === 'all' && priceRange === 'all') {
        displayDishes(allDishes);
        return;
    }

    var filtered = [];
    for (var i = 0; i < allDishes.length; i++) {
        var dish = allDishes[i];
        var cuisineMatch = (cuisine === 'all') || (dish.cuisine === cuisine);
        var priceMatch = (priceRange === 'all') || (dish.priceRange === priceRange);

        if (cuisineMatch && priceMatch) {
            filtered.push(dish);
        }
    }

    displayDishes(filtered);
}


// filter (price)
function filterByPrice() {
    filterByCuisine();
}


// reset filter
function showAllDishes() {
    document.getElementById('searchInput').value = '';

    document.getElementById('cuisineFilter').value = 'all';
    document.getElementById('priceFilter').value = 'all';

    displayDishes(allDishes);
}


// visit stall - go to the stall page for the dish's stall
function visitStall(stallId) {
    window.location.href = 'stalls.html?id=' + stallId;
}

// when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Setup search box Enter key
    var searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchDishes();
        }
    });

    loadDishes();
});
