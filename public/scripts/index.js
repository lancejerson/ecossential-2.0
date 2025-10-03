import products from "./products.js"

const container = document.getElementById('container');

document.addEventListener('DOMContentLoaded', () => {
    products.map(product => {
        const productContainer = document.createElement('div');
        productContainer.className = 'flex flex-col gap-[15px]';
        productContainer.innerHTML = `
            <button class='flex justify-center items-center rounded-xl overflow-hidden product-button'>
                <img src="${product.image}" alt="${product.name}" class="object-cover rounded-xl transform hover:scale-[1.05] duration-300 active:scale-[1.1] duration-300">
            </button>
            <div class='flex justify-between text-[15px] p-[10px]'>
                <p class='font-bold truncate max-w-[60%]'>${product.name}</p>
                <p class='font-bold'>$${product.price.toFixed(2)}</p>
            </div>
        `;
        container.appendChild(productContainer);
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
            }))
            window.location.href='/detail'
        })
    });
});