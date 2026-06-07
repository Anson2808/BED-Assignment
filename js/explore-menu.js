var allDishes = [
    {
        id: 1,
        dishName: "Signature Hokkien Mee",
        stallName: "YouFu Friend Hokkien Mee",
        stallId: 1,
        cuisine: "chinese",
        price: 5.50,
        priceRange: "mid",
        image: "https://admin.misstamchiak.com/wp-content/uploads/2016/12/16069838051_c75eb4dd99_o-e1481721167937.jpg",
        // Hokkien Mee. (n.d.). https://admin.misstamchiak.com/wp-content/uploads/2016/12/16069838051_c75eb4dd99_o-e1481721167937.jpg
        rating: 4.9,
        description: "Our signature dish! Stir-fried yellow noodles with prawns, squid, and rich seafood broth. Cooked with perfect wok hei.",
        tags: ["Signature Dish", "Must Try", "Bestseller"]
    },
    {
        id: 2,
        dishName: "Prawn Noodle",
        stallName: "YouFu Friend Hokkien Mee",
        stallId: 1,
        cuisine: "chinese",
        price: 5.50,
        priceRange: "mid",
        image: "https://eatbook.sg/wp-content/uploads/2017/01/Jalan-Sultan-Prawn-Mee-1.jpg",
        // Prawn Noodle. (n.d.). https://eatbook.sg/wp-content/uploads/2017/01/Jalan-Sultan-Prawn-Mee-1.jpg
        rating: 4.8,
        description: "Fresh prawns in rich prawn broth with yellow noodles. Topped with fried shallots and served with sambal.",
        tags: ["Seafood", "Popular", "Spicy Option"]
    },
    {
        id: 3,
        dishName: "Black Carrot Cake (Small)",
        stallName: "YouFu Friend Hokkien Mee",
        stallId: 1,
        cuisine: "chinese",
        price: 4.00,
        priceRange: "budget",
        image: "https://www.seriouseats.com/thmb/jpan8QJR5zmq1sbWNw8LawPX8aw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2013__05__20130508-251392-dark-carrot-cake-6ed75a0dc68f436d89db76e1913c1573.jpg",
        // Black Carrot Cake. (n.d.). https://www.seriouseats.com/thmb/jpan8QJR5zmq1sbWNw8LawPX8aw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2013__05__20130508-251392-dark-carrot-cake-6ed75a0dc68f436d89db76e1913c1573.jpg
        rating: 4.7,
        description: "Stir-fried radish cake with eggs, cooked with dark sweet soy sauce. Crispy on the outside, soft inside.",
        tags: ["Traditional", "Local Favorite", "Breakfast"]
    },
    {
        id: 4,
        dishName: "Black Carrot Cake (Large)",
        stallName: "YouFu Friend Hokkien Mee",
        stallId: 1,
        cuisine: "chinese",
        price: 6.00,
        priceRange: "mid",
        image: "https://i0.wp.com/www.springtomorrow.com/wp-content/uploads/2014/03/Black-Carrot-Cake-Recipe.jpg?resize=1024%2C768",
        // Black Carrot Cake. (n.d.). https://i0.wp.com/www.springtomorrow.com/wp-content/uploads/2014/03/Black-Carrot-Cake-Recipe.jpg?resize=1024%2C768
        rating: 4.7,
        description: "Larger portion of our famous black carrot cake. Perfect for sharing or for bigger appetites!",
        tags: ["Traditional", "Good for Sharing", "Popular"]
    },
    {
        id: 5,
        dishName: "Oyster Omelette",
        stallName: "YouFu Friend Hokkien Mee",
        stallId: 1,
        cuisine: "chinese",
        price: 8.00,
        priceRange: "premium",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyiW9AH1dy_8w7tgwmFqIkfGjWx-eQWBQgyoQmyw0GLzAcYsozR9tNmxLyE7Zz0u3C4CcvmRo5rd-KX7CpYClf7lIcWVGuUQNzMz0Ze1-N&s=10",
        // Oyster Omelette. (n.d.). https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyiW9AH1dy_8w7tgwmFqIkfGjWx-eQWBQgyoQmyw0GLzAcYsozR9tNmxLyE7Zz0u3C4CcvmRo5rd-KX7CpYClf7lIcWVGuUQNzMz0Ze1-N&s=10
        rating: 4.6,
        description: "Fresh oysters cooked with eggs and starch, creating a crispy exterior. Served with sweet chili sauce.",
        tags: ["Seafood", "Crispy", "Premium"]
    },
    {
        id: 6,
        dishName: "Fried Kway Teow",
        stallName: "YouFu Friend Hokkien Mee",
        stallId: 1,
        cuisine: "chinese",
        price: 4.50,
        priceRange: "budget",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnmnRCE7sST48WJv2xS5LDTUlgVF8RBYznhigLtDcmepqL7gz20AmvUlR4qeJ5YcKLX5_OGQ27XLJXJ60D3tRC_98Q86wCL9y_HDwCc9Bnmg&s=10",
        // Fried Kway Teow. (n.d.). https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnmnRCE7sST48WJv2xS5LDTUlgVF8RBYznhigLtDcmepqL7gz20AmvUlR4qeJ5YcKLX5_OGQ27XLJXJ60D3tRC_98Q86wCL9y_HDwCc9Bnmg&s=10
        rating: 4.8,
        description: "Flat rice noodles stir-fried with eggs, bean sprouts, and Chinese sausage in dark soy sauce. Amazing wok hei!",
        tags: ["Wok Hei", "Savory", "Classic"]
    },
    {
        id: 7,
        dishName: "Signature Hokkien Mee (Large)",
        stallName: "YouFu Friend Hokkien Mee",
        stallId: 1,
        cuisine: "chinese",
        price: 7.00,
        priceRange: "mid",
        image: "https://eatbook.sg/wp-content/uploads/2025/06/Shiok-Hokkien-Mee-kosong-mee.jpg",
        // Signature Hokkien Mee. (n.d.). https://eatbook.sg/wp-content/uploads/2025/06/Shiok-Hokkien-Mee-kosong-mee.jpg
        rating: 4.9,
        description: "Extra large portion of our signature Hokkien Mee with more prawns and squid. Perfect for big appetites!",
        tags: ["Signature Dish", "Bestseller", "Good for Sharing"]
    },
    {
        id: 8,
        dishName: "Prawn Noodle (Large)",
        stallName: "YouFu Friend Hokkien Mee",
        stallId: 1,
        cuisine: "chinese",
        price: 7.00,
        priceRange: "mid",
        image: "https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2021/08/27/69d31954408e4140bc5d3b54f482cba6_Da+Shi+Jia+Hero.jpg",
        // Prawn Noodle. (n.d.). https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2021/08/27/69d31954408e4140bc5d3b54f482cba6_Da+Shi+Jia+Hero.jpg
        rating: 4.8,
        description: "Larger serving of our famous prawn noodles with extra prawns. Rich and flavorful prawn broth.",
        tags: ["Seafood", "Popular", "Generous Portion"]
    },
    {
        id: 9,
        dishName: "White Carrot Cake (Small)",
        stallName: "YouFu Friend Hokkien Mee",
        stallId: 1,
        cuisine: "chinese",
        price: 4.00,
        priceRange: "budget",
        image: "https://thewoksoflife.com/wp-content/uploads/2015/02/turnip-cake-17.jpg",
        // White Carrot Cake. (n.d.). https://thewoksoflife.com/wp-content/uploads/2015/02/turnip-cake-17.jpg
        rating: 4.6,
        description: "Light version of carrot cake without dark soy sauce. Savory and eggy with a delicate flavor.",
        tags: ["Traditional", "Light", "Breakfast"]
    },
    {
        id: 10,
        dishName: "White Carrot Cake (Large)",
        stallName: "YouFu Friend Hokkien Mee",
        stallId: 1,
        cuisine: "chinese",
        price: 6.00,
        priceRange: "mid",
        image: "https://i.ytimg.com/vi/biRXo9Gq87A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCrkFmYHNeXJCo98ImE7UkFEkV9TQ",
        // White Carrot Cake. (n.d.). https://i.ytimg.com/vi/biRXo9Gq87A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCrkFmYHNeXJCo98ImE7UkFEkV9TQ
        rating: 4.6,
        description: "Bigger portion of our white carrot cake. Light and savory, perfect for those who prefer less sweet.",
        tags: ["Traditional", "Light", "Good for Sharing"]
    },
    {
        id: 11,
        dishName: "Mixed Carrot Cake",
        stallName: "YouFu Friend Hokkien Mee",
        stallId: 1,
        cuisine: "chinese",
        price: 5.00,
        priceRange: "budget",
        image: "https://thewoksoflife.com/wp-content/uploads/2019/01/carrot-rice-cake-22.jpg",
        // Mixed Carrot Cake. (n.d.). https://thewoksoflife.com/wp-content/uploads/2019/01/carrot-rice-cake-22.jpg
        rating: 4.7,
        description: "Can't decide? Get both! Half black, half white carrot cake for the best of both worlds.",
        tags: ["Best of Both", "Popular", "Unique"]
    },
    {
        id: 12,
        dishName: "Seafood Hokkien Mee",
        stallName: "YouFu Friend Hokkien Mee",
        stallId: 1,
        cuisine: "chinese",
        price: 8.50,
        priceRange: "premium",
        image: "https://admin.misstamchiak.com/wp-content/uploads/2016/12/16069838051_c75eb4dd99_o-e1481721167937.jpg",
        // Seafood Hokkien Mee. (n.d.). https://admin.misstamchiak.com/wp-content/uploads/2016/12/16069838051_c75eb4dd99_o-e1481721167937.jpg
        rating: 4.9,
        description: "Premium version with extra prawns, squid, and clams. Maximum seafood in every bite!",
        tags: ["Premium", "Seafood Lover", "Special"]
    }
];


function loadDishes() {
    displayDishes(allDishes);
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
        imageHTML = '<span style="font-size: 4em;">ðŸ½ï¸</span>';
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
                    '<button class="visit-stall-btn-full" onclick="visitStall()">Visit The Stall!</button>' +
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


// visit stall - ALL dishes go to YouFu Friend Hokkien Mee
function visitStall() {
    // Always redirect to the stalls page
    window.location.href = 'stalls.html';
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
    
    var urlParams = new URLSearchParams(window.location.search);
    var searchTerm = urlParams.get('search');
    
    if (searchTerm) {
        searchInput.value = searchTerm;
        searchDishes();
    }
});