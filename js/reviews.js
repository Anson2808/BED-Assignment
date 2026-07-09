// Reviews now come from the backend database (Feedback table)
var API_BASE = 'http://localhost:3000/api';

// Holds the reviews fetched from the backend so sorting can reuse them
var loadedReviews = [];

function loadReviews() {
    // Locate where to display the reviews
    var reviewContainer = document.getElementById("reviewList");

    fetch(API_BASE + '/reviews')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Server returned ' + response.status);
            }
            return response.json();
        })
        .then(function(reviews) {
            // Convert each database row into the shape this page displays
            loadedReviews = reviews.map(function(row) {
                return {
                    name: row.CustName,
                    stall: row.StallName,
                    rating: row.FdbkRating,
                    text: row.FdbkComment,
                    date: new Date(row.FdbkDateTime).toLocaleDateString(),
                    dateTime: row.FdbkDateTime
                };
            });

            displayReviews(loadedReviews);
        })
        .catch(function(error) {
            console.error('Failed to load reviews:', error);
            reviewContainer.innerHTML = '<p>Could not load reviews. Make sure the backend server is running (npm run dev in hawker-backend).</p>';
        });
}

// Show a list of reviews on the page
function displayReviews(reviews) {
    var reviewContainer = document.getElementById("reviewList");

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

    // Combine them together
    var html =
        '<div class="review-card">' +
            '<h3>' + review.name + '</h3>' +
            '<p class="date">reviewed <strong>' + review.stall + '</strong></p>' +
            '<div class="stars">' + stars + '</div>' +
            '<p class="date">' + review.date + '</p>' +
            '<p>' + review.text + '</p>' +
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

// Sort reviews by newest date
function sortByNewest(reviews) {
    for (var i = 0; i < reviews.length - 1; i++) {
        for (var j = 0; j < reviews.length - i - 1; j++) {
            if (new Date(reviews[j].dateTime) < new Date(reviews[j + 1].dateTime)) {
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
    // Prevents sorting if there are no reviews
    if (loadedReviews.length === 0) {
        alert("No reviews to sort");
        return;
    }

    var reviews = loadedReviews.slice();

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

    displayReviews(reviews);
}

//Runs once the page finishes loading and automatically displays reviews
window.addEventListener('DOMContentLoaded', function() {
    loadReviews();
});
