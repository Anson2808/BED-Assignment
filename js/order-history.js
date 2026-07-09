// Order history page.
// Registered members: history is loaded from the backend database,
// so it works from any device.
// Guests: history is loaded from this browser's localStorage only.
var API_BASE = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', function() {
    var viewerSelect = document.getElementById('viewerSelect');

    // Fill the viewer dropdown with registered customers from the database
    fetch(API_BASE + '/customers')
        .then(function(response) { return response.json(); })
        .then(function(customers) {
            customers.forEach(function(customer) {
                var option = document.createElement('option');
                option.value = customer.CustID;
                option.textContent = customer.CustName + ' (member)';
                viewerSelect.appendChild(option);
            });
        })
        .catch(function(error) {
            console.error('Could not load customers:', error);
        });

    viewerSelect.addEventListener('change', showHistory);

    // Show guest history by default
    showHistory();

    function showHistory() {
        if (viewerSelect.value === 'guest') {
            showGuestHistory();
        } else {
            showMemberHistory(viewerSelect.value);
        }
    }

    // Member history comes from the database through the backend API
    function showMemberHistory(customerId) {
        var historyList = document.getElementById('historyList');
        historyList.innerHTML = '<p>Loading...</p>';

        fetch(API_BASE + '/orders/customer/' + customerId)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Server returned ' + response.status);
                }
                return response.json();
            })
            .then(function(orders) {
                if (orders.length === 0) {
                    historyList.innerHTML = '<p>No orders yet for this member.</p>';
                    return;
                }

                historyList.innerHTML = '';
                orders.forEach(function(order) {
                    historyList.innerHTML += createOrderCard(
                        'Order #' + order.orderId + ' — ' + order.stallName,
                        new Date(order.orderDate).toLocaleString(),
                        order.pmtType,
                        order.items.map(function(item) {
                            return item.quantity + ' × ' + item.itemDesc + ' ($' + item.unitPrice.toFixed(2) + ' each)';
                        }),
                        order.total
                    );
                });
            })
            .catch(function(error) {
                console.error('Failed to load order history:', error);
                historyList.innerHTML = '<p>Could not load order history. Make sure the backend server is running.</p>';
            });
    }

    // Guest history lives in this browser's localStorage
    function showGuestHistory() {
        var historyList = document.getElementById('historyList');

        var history = [];
        try {
            history = JSON.parse(localStorage.getItem('guestOrderHistory')) || [];
        } catch (err) {
            history = [];
        }

        if (history.length === 0) {
            historyList.innerHTML = '<p>No guest orders on this browser yet.</p>';
            return;
        }

        historyList.innerHTML =
            '<div class="guest-note">Guest orders are saved on this browser only. ' +
            'Order as a member to keep your history on any device.</div>';

        // Newest orders first
        for (var i = history.length - 1; i >= 0; i--) {
            var order = history[i];
            historyList.innerHTML += createOrderCard(
                'Guest Order',
                new Date(order.orderedAt).toLocaleString(),
                order.pmtType || '-',
                order.items.map(function(item) {
                    var stallText = item.stallName ? ' from ' + item.stallName : '';
                    return item.quantity + ' × ' + item.name + stallText + ' ($' + parseFloat(item.price).toFixed(2) + ' each)';
                }),
                order.total
            );
        }
    }

    // Build one order card's HTML
    function createOrderCard(title, dateText, pmtType, itemLines, total) {
        var itemsHTML = '';
        for (var i = 0; i < itemLines.length; i++) {
            itemsHTML += '<li>' + itemLines[i] + '</li>';
        }

        return '<div class="order-card">' +
            '<h3>' + title + '</h3>' +
            '<p class="order-meta">' + dateText + ' · Paid by ' + pmtType + '</p>' +
            '<ul>' + itemsHTML + '</ul>' +
            '<p class="order-total">Total: $' + parseFloat(total).toFixed(2) + '</p>' +
        '</div>';
    }
});
