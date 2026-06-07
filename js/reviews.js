function loadReviews() {
    var savedReviews = localStorage.getItem("reviews");
    var reviews = [];
    
    // Converts the text to array
    if (savedReviews) {
        reviews = JSON.parse(savedReviews);
    }
    
    // Locate where to display text
    //Gets the HTML element where the reviews will be displayed
    var reviewContainer = document.getElementById("reviewList");
    
    // If no review?
    // Check if there are no reviews
    if (reviews.length === 0) {
        reviewContainer.innerHTML = '<p>No reviews yet. Be the first to write a review!</p>';
        return;
    }
    
    // Clear the existing content
    reviewContainer.innerHTML = '';
    
    // Display reviews
    for (var i = 0; i < reviews.length; i++) {
        var review = reviews[i];
        var reviewHTML = createReviewHTML(review);
        // Appends the review HTML into the container
        reviewContainer.innerHTML = reviewContainer.innerHTML + reviewHTML;
    }
}

// HTML for single review
function createReviewHTML(review) {
    // Create star symbols based on the rating
    var stars = createStars(review.rating);
    
    // Show the image
    var image = '';
    // Check if there is an image
    // Generate <img> tag if image exists
    if (review.image) {
        image = '<img src="' + review.image + '" alt="Review image">';
    }
    
    // Combine them together
    var html = 
        '<div class="review-card">' +
            '<h3>' + review.name + '</h3>' +
            '<div class="stars">' + stars + '</div>' +
            '<p class="date">' + review.date + '</p>' +
            '<p>' + review.text + '</p>' +
            image +
        '</div>';
    
    return html;
}

// Create star based on rating
function createStars(rating) {
    var stars = '';
    
    // For loop to check
    // Loop 5 times for 5 stars
    for (var i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars = stars + '★';
        } else {
            stars = stars + '☆';
        }
    }
    
    return stars;
}

// Sort reviews by highest rating
function sortByHighest(reviews) {
    // bubble sort
    for (var i = 0; i < reviews.length - 1; i++) {
        for (var j = 0; j < reviews.length - i - 1; j++) {
            if (reviews[j].rating < reviews[j + 1].rating) {
                var temp = reviews[j];
                reviews[j] = reviews[j + 1];
                reviews[j + 1] = temp;
            }
        }
    }
    return reviews;
}

// Sort reviews by lowest rating
function sortByLowest(reviews) {
    for (var i = 0; i < reviews.length - 1; i++) {
        for (var j = 0; j < reviews.length - i - 1; j++) {
            if (reviews[j].rating > reviews[j + 1].rating) {
                var temp = reviews[j];
                reviews[j] = reviews[j + 1];
                reviews[j + 1] = temp;
            }
        }
    }
    return reviews;
}

// Main sort function
function sortReviews(sortType) {
    // Get reviews from local storage
    var savedReviews = localStorage.getItem("reviews");
    var reviews = [];
    
    // Converts the text to array
    if (savedReviews) {
        reviews = JSON.parse(savedReviews);
    }
    
    // Prevents sorting if there are no reviews
    if (reviews.length === 0) {
        alert("No reviews to sort");
        return;
    }
    
    // Sort by highest rating
    if (sortType === "highest") {
        reviews = sortByHighest(reviews);
    } 
    
    // Sort by lowest rating
    else if (sortType === "lowest") {
        reviews = sortByLowest(reviews);
    }
    // Sort by newest date
    else if (sortType === "newest") {
        reviews = sortByNewest(reviews);
    }
    
function sortByNewest(reviews) {
    // Reverse the array so newest comes first
    var reversed = [];
    // Pushes reviews from last to first
    for (var i = reviews.length - 1; i >= 0; i--) {
        reversed.push(reviews[i]);
    }
    return reversed;
}

    //Clears existing reviews
    var reviewContainer = document.getElementById("reviewList");
    reviewContainer.innerHTML = '';
    
    for (var i = 0; i < reviews.length; i++) {
        var review = reviews[i];
        var reviewHTML = createReviewHTML(review);
            
        // Prints the reviews
        reviewContainer.innerHTML = reviewContainer.innerHTML + reviewHTML;
    }
}

//Runs once the page finishes loading and automatically displays reviews
window.addEventListener('DOMContentLoaded', function() {
    loadReviews();
});