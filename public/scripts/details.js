// const addToCart = document.getElementById('add-to-cart')
// let basket = []

// document.addEventListener('DOMContentLoaded', () => {
//     const selectedItem = localStorage.getItem('selectedProduct')
//     if(selectedItem){
//         const item = JSON.parse(selectedItem)
//         document.getElementById('product-image').src = item.image
//         document.getElementById('product-name').textContent = item.name
//         document.getElementById('product-price').textContent = `₱${item.price.toFixed(2)}`
//         document.getElementById('product-description').textContent = item.description
//     }else{
//         window.location.href='/products'
//     }
//     addToCart.addEventListener('click', () => {
//         const selectedItem = localStorage.getItem('selectedProduct');
//         if (selectedItem) {
//             const item = JSON.parse(selectedItem);
//             basket.push(item)
//             localStorage.setItem('addedToCart', JSON.stringify(basket))
//         }
//     });
// })

const addToCart = document.getElementById('add-to-cart');
const productDataContainer = document.getElementById('product-data')
const selectedItem = localStorage.getItem('selectedProduct');
let basket = JSON.parse(localStorage.getItem('addedToCart')) || []; // Load existing cart
let secondBasket = JSON.parse(localStorage.getItem('liked')) || []

document.addEventListener('DOMContentLoaded', () => {
    if(selectedItem){
        const item = JSON.parse(selectedItem);

        document.getElementById('product-image').src = item.image;
        const productData = document.createElement('div')
        
        productData.className = "flex flex-col h-full w-full"
        productData.innerHTML = `
            <div class="flex flex-col justify-between h-[15%] w-full border-b grey-border2 pb-s[15px]">
                <h4 class="grey-text text-[15px]">PANTS COLLECTION</h4>
                <h1 class="font-semibold text-[30px]">${item.name}</h1>
                <div class="flex flex-row w-full gap-[8px] items-center">
                    <i class="fa-solid fa-truck grey-text"></i>
                    <h4 class="grey-text text-[15px]">Expected Arrival: 3-8 Business Days</h4>
                </div>
            </div>
            <div class="flex flex-col gap-3 h-[40%] w-full border-b grey-border2 pt-[15px]">
                <h4 class="text-black text-[15px]">DESCRIPTION</h4>
                <h4 class="grey-text text-[15px]">${item.description || 'No Description Available'}</h4>
                <h4 class="text-black text-[15px]">DIMENSION</h4>
                <div class="flex flex-col gap-[2px]">
                    <h4 class="grey-text text-[15px]">Width: ${item.width} inches</h4>
                    <h4 class="grey-text text-[15px]">Length: ${item.length} inches</h4>
                </div>
            </div>
            <div class="h-[15%] pt-[15px] flex flex-col w-full">
                <div class="flex justify-between w-full h-[50%] items-center">
                    <h4 class="text-black text-[15px]">QUANTITY: <span class="grey-text text-[15px]">1</span></h4>
                    <div class="rounded-full grey-border h-[20px] w-[20px] p-[15px] items-center flex justify-center transform hover:scale-[1.2] duration-300">
                        <button id="heart"><i class="fa-regular fa-heart text-[15px] text-black"></i></button>
                    </div>
                </div>
                <div class="flex justify-between w-full h-[50%] items-center">
                    <button class="w-[45%] bg-white text-black border-2 border-black h-[80%] rounded-full transform hover:scale-[1.05] duration-300 active:scale-[1.1]" id="add-to-cart">Add to Cart</button>
                    <button class="w-[45%] bg-black text-white border-2 border-black h-[80%] rounded-full transform hover:scale-[1.05] duration-300 active:scale-[1.1]">Buy Now</button>    
                </div>
            </div>
            <div class="pt-[15px] flex flex-row gap-3">
                <h1 class= "text-[30px] text-black font-black">PRICE:</h1>
                <h1 class= "text-[30px] text-black font-black"><i class="fa-solid fa-peso-sign"></i>${item.price}</h1>
            </div>
        `
        productDataContainer.appendChild(productData)
        const heartButton = document.getElementById('heart');
        const heartIcon = heartButton.querySelector('i')
        const isLiked = secondBasket.some(likedItem => likedItem.id === item.id)

        if(isLiked){
            heartIcon.classList.remove('fa-regular');
            heartIcon.classList.add('fa-solid', 'text-red-500');
        }

        heartButton.addEventListener('click', function() {
            if (heartIcon.classList.contains('fa-regular')) {
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid', 'text-red-500');
                secondBasket.push(item);
                localStorage.setItem('liked', JSON.stringify(secondBasket));
            } else {
                heartIcon.classList.remove('fa-solid', 'text-red-500');
                heartIcon.classList.add('fa-regular');
                const index = secondBasket.findIndex(likedItem => likedItem.id === item.id);

                if(index > -1){
                    secondBasket.splice(index, 1);
                    localStorage.setItem('liked', JSON.stringify(secondBasket));
                }
            }
        });
    } else {
        window.location.href='/products';
    }
    const addToCart = document.getElementById('add-to-cart')

    addToCart.addEventListener('click', () => {
        if (selectedItem) {
            const item = JSON.parse(selectedItem);

            basket.push(item);
            localStorage.setItem('addedToCart', JSON.stringify(basket));
            alert('Item added to cart!');
        }
    });
});