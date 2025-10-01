document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cart-container');
    
    try {
        container.innerHTML = '';

        // Get cart data from localStorage
        const cartData = localStorage.getItem('addedToCart');
        console.log('Raw cart data from localStorage:', cartData);
        console.log('Type of cart data:', typeof cartData);

        let cartItems = [];

        // Handle different scenarios
        if (!cartData || cartData === 'null' || cartData === 'undefined') {
            // No cart data exists
            console.log('No cart data found, initializing empty cart');
            cartItems = [];
        } else {
            try {
                // Try to parse the data
                const parsed = JSON.parse(cartData);
                console.log('Parsed data:', parsed);
                console.log('Type of parsed data:', typeof parsed);
                
                if (Array.isArray(parsed)) {
                    // It's a valid array
                    cartItems = parsed;
                } else if (typeof parsed === 'object' && parsed !== null) {
                    // It's a single object, wrap it in array
                    console.log('Found single object, converting to array');
                    cartItems = [parsed];
                } else if (typeof parsed === 'number') {
                    // This was the original bug - number from array.push()
                    console.log('Found corrupted number data, resetting cart');
                    cartItems = [];
                    localStorage.setItem('addedToCart', JSON.stringify([]));
                } else {
                    // Unexpected format
                    console.log('Unexpected data format, resetting cart');
                    cartItems = [];
                    localStorage.setItem('addedToCart', JSON.stringify([]));
                }
            } catch (parseError) {
                // JSON parse failed - data is corrupted
                console.error('JSON parse error:', parseError);
                console.log('Resetting corrupted cart data');
                cartItems = [];
                localStorage.setItem('addedToCart', JSON.stringify([]));
            }
        }

        cartItems.forEach((item, index) => {
            if (!item || typeof item !== 'object') {
                console.warn('Invalid item at index', index, item);
                return;
            }
            const cartItem = document.createElement('div');
            cartItem.className = 'h-[40%] h-full flex flex-row border-b p-[20px]';
            
            // Use safe property access with fallbacks
            cartItem.innerHTML = `
                <div class="flex flex-col gap-9">
                    <h3 class="font-semibold text-lg">${item.name || 'Unknown Product'}</h3>
                    <p class="text-gray-600 text-xl font-bold">₱${(item.price || 0).toFixed(2)}</p>
                    <p class="text-sm text-gray-500 mt-2">${item.description || ''}</p>
                </div>
                <div class="w-[25%] h-full flex justify-center items-center">
                    <img src="${item.image || ''}" alt="${item.name || 'Product'}" 
                        class="w-full h-full object-cover rounded-lg border">
                </div>
            `;
            container.appendChild(cartItem);
        });

    } catch (error) {
        console.error('Unexpected error loading cart:', error);
        container.innerHTML = `
            <div class="text-red-500 p-8 text-center">
                <p>Error loading cart items</p>
                <button onclick="resetCart()" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Reset Cart
                </button>
            </div>
        `;
    }
});

// Function to completely reset the cart
function resetCart() {
    localStorage.setItem('addedToCart', JSON.stringify([]));
    location.reload();
}