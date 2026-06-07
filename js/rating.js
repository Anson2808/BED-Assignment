// Select all the star elements
var stars = document.querySelectorAll("#starRating span");

// Add a click event to all stars, for the loop to loop through and add
function setupStarRating() {
    for (var i = 0; i < stars.length; i++) {
        stars[i].onclick = function() {
            handleStarClick(this);
        };
        
        // Adding the hover effect
        stars[i].onmouseover = function() {
            handleStarHover(this);
        };
    }
}

// Handles what happens when stars are clicked
function handleStarClick(clickedStar) {
    // Checking the value
    var rating = clickedStar.getAttribute("data-value");
    
    // Save to the browser
    localStorage.setItem("rating", rating);
    
    // Redirect to review page to fill form after clicking a star
    window.location.href = "review.html";
}

// Handles when mouse hovers over a star
function handleStarHover(hoveredStar) {
    // Retrieve rating of the hovered star
    var rating = hoveredStar.getAttribute("data-value");
    
    // Light the stars up
    highlightStars(rating);
}

// Light up
function highlightStars(rating) {
    // Loop through all stars
    for (var i = 0; i < stars.length; i++) {
        var starValue = stars[i].getAttribute("data-value");
        
        // In the active class means light up
        // If the star's value is less than or equal to the rating, light it up
        if (starValue <= rating) {
            stars[i].classList.add("active");
        } else {
            stars[i].classList.remove("active");
        }
    }
}

setupStarRating();