// api
var RAINFALL_API_URL = 'https://api-open.data.gov.sg/v2/real-time/api/rainfall';

// fetching
function fetchSingaporeWeather() {
    // fetch
    fetch(RAINFALL_API_URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displaySingaporeWeather(data);
        })
        .catch(function(error) {
            displayWeatherError(error);
        });
}

// displayyayayay
function displaySingaporeWeather(data) {
    var widget = document.getElementById('weatherWidget');
    
    if (!widget) {
        console.error('Weather widget element not found');
        return;
    }
    
    // Get the latest reading
    var latestReading = data.data.readings[0];
    var timestamp = new Date(latestReading.timestamp);
    
    // Calculate average rainfall across all stations
    var totalRainfall = 0;
    var stationCount = 0;
    
    for (var i = 0; i < latestReading.data.length; i++) {
        totalRainfall += latestReading.data[i].value;
        stationCount++;
    }
    
    var avgRainfall = (totalRainfall / stationCount).toFixed(1);
    
    // Determine weather condition based on rainfall
    var condition = getWeatherCondition(avgRainfall);
    var suggestion = condition.suggestion;
    
    // Format time
    var timeString = formatTime(timestamp);
    
    // Build HTML
    var html = 
        '<div class="weather-content">' +
            '<div class="weather-info">' +
                '<div class="weather-time">Updated: ' + timeString + '</div>' +
                '<div class="weather-suggestion">' + suggestion + '</div>' +
            '</div>' +
        '</div>';
    
    widget.innerHTML = html;
}

// === GET WEATHER CONDITION ===
function getWeatherCondition(rainfall) {
    // based on the rainfall in mm
    if (rainfall === 0) {
        return {
            description: 'No Rain - Perfect Weather!',
            suggestion: 'outdoor hawker centres WOOOOO'
        };
    } else if (rainfall < 1) {
        return {
            description: 'Light Drizzle',
            suggestion: 'Slight drizzle, dodge them or eat in sheltered hawkers'
        };
    } else if (rainfall < 5) {
        return {
            description: 'Light Rain',
            suggestion: 'Rainy weather - hot soup recommended honestly'
        };
    } else if (rainfall < 10) {
        return {
            description: 'Moderate Rain',
            suggestion: 'Stay dry! justs stay indoor, or take delivery'
        };
    } else {
        return {
            description: 'Heavy Rain',
            suggestion: 'Heavy rain! best hide and not go out'
        };
    }
}

// === FORMAT TIME ===
function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    
    return hours + ':' + minutes;
}

// if error
function displayWeatherError(error) {
    var widget = document.getElementById('weatherWidget');
    
    if (!widget) return;
    
    widget.innerHTML = 
        '<div class="weather-error">' +
            'error error<br>'
        '</div>';
    
    console.error('Weather API error:', error);
}

// Load weather when page loads
window.addEventListener('DOMContentLoaded', function() {
    fetchSingaporeWeather();
    
    // Refresh weather every 5 minutes
    setInterval(fetchSingaporeWeather, 300000);
});