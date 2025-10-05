const likedItemsContainer = document.getElementById('liked-items')
const likedItems = localStorage.getItem('liked')
const allLikedItems = JSON.parse(likedItems) || []

document.addEventListener('DOMContentLoaded', () => {
    allLikedItems.map(item => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'flex flex-col overflow-hidden';
        itemContainer.innerHTML = `
            <div class='flex flex-col items-center justify-center h-full w-full'>
                <button class='flex w-full h-[90%] justify-center items-center rounded-lg overflow-hidden product-button'>
                    <img src="${item.image}" alt="${item.name}" class="object-cover w-full h-full rounded-lg transform hover:scale-[1.05] duration-300 active:scale-[1.1] duration-300"> 
                </button>
                <div class='flex justify-between text-[15px] w-full p-[10px]'>
                    <h1 class='font-semibold truncate max-w-[60%]'>${item.name}</h1>
                    <h1 class='font-semibold'>$${item.price.toFixed(2)}</h1>
                </div>
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