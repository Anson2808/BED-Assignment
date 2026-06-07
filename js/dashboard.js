// dashboard.js - Simplified and Beginner Friendly

// === WAIT FOR PAGE TO LOAD ===
window.addEventListener('DOMContentLoaded', function() {
    
    // Run all setup functions
    setupSearch();
    updateFooterYear();
    
    console.log('Dashboard loaded successfully!');
});


// === SEARCH BOX FUNCTIONALITY ===
function setupSearch() {
    var searchBox = document.getElementById('dashboardSearch');
    
    if (searchBox) {
        // When user types and presses Enter
        searchBox.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                handleSearch();
            }
        });
        
        // Change border color when clicked
        searchBox.addEventListener('focus', function() {
            this.style.outline = '2px solid #f17b28';
        });
        
        // Remove border color when clicked away
        searchBox.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    }
}

// searching function
function handleSearch() {
    var searchBox = document.getElementById('dashboardSearch');
    var searchTerm = searchBox.value.trim();
    
    if (searchTerm) {
        window.location.href = 'explore-menu.html?search=' + encodeURIComponent(searchTerm);
    } else {
        window.location.href = 'explore-menu.html';
    }
}


// === UPDATE FOOTER YEAR ===
function updateFooterYear() {
    var yearElement = document.querySelector('.footer-year');
    
    if (yearElement) {
        var currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}