// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);

// Track active visitors in the Realtime Database
const visitorCountRef = db.ref('visitorCount');

// Update the visitor count on page load
window.onload = function() {
    // Increment the visitor count when the page is loaded
    visitorCountRef.transaction(function(currentValue) {
        return (currentValue || 0) + 1;
    });
    
    // Listen for changes to the visitor count
    visitorCountRef.on('value', function(snapshot) {
        const visitorCount = snapshot.val();
        document.getElementById('visitor-count-value').textContent = visitorCount;
    });
};

// When the user leaves the page, decrement the visitor count
window.addEventListener('beforeunload', function() {
    visitorCountRef.transaction(function(currentValue) {
        return (currentValue || 0) - 1;
    });
});

// Cart functionality
let cart = [];
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.getElementById('close-modal');
const cartItemsList = document.getElementById('cart-items-list');
const totalPriceElement = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-btn');

const items = [
    { name: 'Item 1', price: 19.99, image: 'https://via.placeholder.com/150' },
    { name: 'Item 2', price: 29.99, image: 'https://via.placeholder.com/150' },
    { name: 'Item 3', price: 39.99, image: 'https://via.placeholder.com/150' }
];

// Add items to the cart
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        cart.push(items[index]);
        updateCart();
    });
});

// Update the cart counter and display cart items
function updateCart() {
    const cartItemCount = cart.length;
    cartButton.textContent = `Cart (${cartItemCount})`;

    let total = 0;
    cartItemsList.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Open the cart modal
cartButton.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

// Close the cart modal
closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Handle checkout (just a simple alert for now)
checkoutButton.addEventListener('click', () => {
    alert('Proceeding to checkout!');
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
});
