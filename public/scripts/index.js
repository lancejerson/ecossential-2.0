import products from "./products.js"

const container = document.getElementById('container');

document.addEventListener('DOMContentLoaded', () => {
    products.map(product => {
        const productContainer = document.createElement('div');
        productContainer.className = 'flex flex-col overflow-hidden';
        productContainer.innerHTML = `
            <div class='flex flex-col items-center justify-center h-full w-full'>
                <button class='flex w-full h-[90%] justify-center items-center rounded-lg overflow-hidden product-button'>
                    <img src="${product.image}" alt="${product.name}" class="object-cover w-full h-full rounded-lg transform hover:scale-[1.05] duration-300 active:scale-[1.1] duration-300"> 
                </button>
                <div class='flex justify-between text-[15px] w-full p-[10px]'>
                    <h1 class='font-semibold truncate max-w-[60%]'>${product.name}</h1>
                    <h1 class='font-semibold'>$${product.price.toFixed(2)}</h1>
                </div>
            </div>
        `;

        const productButton = productContainer.querySelector('.product-button');
        productButton.addEventListener('click', () => {
            localStorage.setItem('selectedProduct', JSON.stringify({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
                length: product.length, 
                width: product.width,
            }));
            window.location.href = '/detail';
        });
        container.appendChild(productContainer);
    });
});