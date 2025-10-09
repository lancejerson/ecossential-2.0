document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cart-container');
    const priceContainer = document.getElementById('total-amount');
    const cartData = localStorage.getItem('addedToCart');

    try {
        container.innerHTML = '';

        // Get cart data from localStorage
        console.log('Raw cart data from localStorage:', cartData);

        let cartItems;

        // Handle different scenarios (your existing logic is good)
        if (!cartData || cartData === 'null' || cartData === 'undefined') {
            cartItems = [];
        } else {
            try {
                const parsed = JSON.parse(cartData);
                
                if (Array.isArray(parsed)) {
                    cartItems = parsed;
                } else if (typeof parsed === 'object' && parsed !== null) {
                    cartItems = [parsed];
                } else if (typeof parsed === 'number') {
                    cartItems = [];
                    localStorage.setItem('addedToCart', JSON.stringify([]));
                } else {
                    cartItems = [];
                    localStorage.setItem('addedToCart', JSON.stringify([]));
                }
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                cartItems = [];
                localStorage.setItem('addedToCart', JSON.stringify([]));
            }
        }

        // Calculate total BEFORE the loop
        const subtotal = cartItems.reduce((total, item) => {
            return total + (item.price || 0);
        }, 0);

        // Display cart items
        cartItems.forEach((item, index) => {
            if (!item || typeof item !== 'object') {
                console.warn('Invalid item at index', index, item);
                return;
            }

            const cartItem = document.createElement('div');
            cartItem.className = 'h-[80%] w-full flex flex-row border-b pb-[0.5rem] justify-center items-center';

            cartItem.innerHTML = `
                <div class="flex flex-col justify-between h-full p-[20px]">
                    <h3 class="font-semibold text-lg">${item.name || 'Unknown Product'}</h3>
                    <p class="text-gray-600 text-xl font-bold">₱${(item.price || 0).toFixed(2)}</p>
                    <p class="text-sm text-gray-500 mt-2">${item.description || ''}</p>
                </div>
                <div class="w-[40%] h-full flex justify-center items-center">
                    <img src="${item.image || ''}" alt="${item.name || 'Product'}" 
                    class="w-full h-full object-cover rounded-lg border">
                </div> 
            `;
            container.appendChild(cartItem);
        });

        // Update price container ONCE after the loop
        priceContainer.innerHTML = `
        <div class="flex flex-col items-center w-[80%] bg-white rounded-lg">
            <div class="w-full py-6 flex justify-center items-center border grey-border2">
                <h1 class="text-[28px] font-bold">Order Summary</h1>
            </div>
            <div class="w-full p-6 border grey-border2 space-y-4">
                <div class="flex justify-between w-full">
                    <h3 class="font-bold text-lg">SUBTOTAL:</h3>
                    <h3>$${subtotal.toFixed(2)}</h3>
                </div>
                <div class="flex justify-between w-full">
                    <h3 class="font-bold text-lg">SHIPPING:</h3>
                    <h3>FREE</h3>
                </div>
                <div class="flex justify-between w-full">
                    <h3 class="font-bold text-lg">QUANTITY:</h3>
                    <h3>${cartItems.length} Items(s)</h3>
                </div>
            </div>
            <div class="w-full p-6 border grey-border2">
                <div class="flex justify-between w-full">
                    <h3 class="font-bold text-xl">TOTAL:</h3>
                    <h3 class="font-bold text-xl">$${subtotal.toFixed(2)}</h3>
                </div>
            </div>
        </div>
        <div class="w-[80%] h-[7rem] flex flex-col gap-3 items-center justify-center">
            <button class="h-[45%] w-full flex items-center justify-center bg-red-500" onclick="location.href='/checkout'">
                <h1 class="text-[1.5rem] font-semibold text-white"> Checkout</h1>
            </button>
            <button class="h-[45%] w-full flex items-center justify-center bg-white border border-black" onclick="location.href='/products'">
                <h1 class="text-[1.5rem] font-semibold text-black">Continue Shopping</h1>
            </button>
        </div>
        
        `;

        // Show empty cart message if no items
        if (cartItems.length === 0) {
            container.innerHTML = `
                <div class="text-center p-8 text-gray-500">
                    <p>Your cart is empty</p>
                    <a href="/products" class="text-blue-500 hover:underline mt-2 inline-block">Continue Shopping</a>
                </div>
            `;
        }

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