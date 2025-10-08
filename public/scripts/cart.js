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
            cartItem.className = 'h-[40%] h-full flex flex-row border-b p-[20px]';
            
            cartItem.innerHTML = `
                <div class="flex flex-col gap-9">
                    <h3 class="font-semibold text-lg">${item.name || 'Unknown Product'}</h3>
                    <p class="text-gray-600 text-xl font-bold">₱${(item.price || 0).toFixed(2)}</p>
                    <p class="text-sm text-gray-500 mt-2">${item.description || ''}</p>
                </div>
                <div class="w-[35%] h-full flex justify-center items-center">
                    <img src="${item.image || ''}" alt="${item.name || 'Product'}" 
                        class="w-full h-full object-cover rounded-lg border">
                </div>
            `;
            container.appendChild(cartItem);
        });

        // Update price container ONCE after the loop
        priceContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center overflow-hidden h-[60%] w-[60%] border black-border">
            <div class="w-full h-[20%] w-full flex justify-center items-center border black-border">
                <h1 class="text-[35px]">Order Summary</h1>
            </div>
            <div class="h-[50%] border w-full p-[25px] black-border flex flex-col justify-between">
                <div class="flex justify-between w-full">
                    <h3 class="font-bold text-lg">SUBTOTAL:</h3>
                    <h3>${subtotal.toFixed(2)}</h3>
                </div>
                <div class="flex justify-between w-full">
                    <h3 class="font-bold text-lg">SHIPPING:</h3>
                    <h3>FREE</h3>
                </div>
                <div class="flex justify-between w-full">
                    <h3 class="font-bold text-lg">QUANTITY:</h3>
                    <h3>${cartItems.length}</h3>
                </div>
            </div>
            <div class="h-[15%] border w-full p-[25px] black-border flex items-center">
                <div class="flex justify-between w-full">
                    <h3 class="font-bold text-lg">TOTAL:</h3>
                    <h3>${subtotal.toFixed(2)}</h3>
                </div>
            </div>
            <div class="h-[15%] border w-full p-[15px] black-border">
                <button class="w-full h-full flex justify-center items-center" onclick="location.href='/checkout'">Checkout</button>
            </div>
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