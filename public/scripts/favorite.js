const likedItemsContainer = document.getElementById('liked-items')
const likedItems = localStorage.getItem('liked')
const allLikedItems = JSON.parse(likedItems) || []

document.addEventListener('DOMContentLoaded', () => {
    allLikedItems.map(item => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'flex flex-col gap-[15px] items-center justify-center';
        itemContainer.innerHTML = `
                <button class='flex justify-center items-center rounded-xl overflow-hidden product-button'>
                    <img src="${item.image}" alt="${item.name}" class="object-cover rounded-xl transform hover:scale-[1.05] duration-300 active:scale-[1.1] duration-300">
                </button>
                <div class='flex justify-between text-[15px] w-full p-[10px]'>
                    <h1 class='font-bold truncate max-w-[60%]'>${item.name}</h1>
                    <h1 class='font-bold'>$${item.price.toFixed(2)}</h1>
                </div>
        `;
        likedItemsContainer.appendChild(itemContainer)  
        const productButton = itemContainer.querySelector('.product-button');
        productButton.addEventListener('click', () => {
            localStorage.setItem('selectedProduct', JSON.stringify({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                description: item.description,
                length: item.length, 
                width: item.width,
            }))
            window.location.href='/detail'
        })
    })
})