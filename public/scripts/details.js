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
const selectedItem = localStorage.getItem('selectedProduct');
let basket = JSON.parse(localStorage.getItem('addedToCart')) || []; // Load existing cart

document.addEventListener('DOMContentLoaded', () => {
    if(selectedItem){
        const item = JSON.parse(selectedItem);
        document.getElementById('product-image').src = item.image;
        document.getElementById('product-name').textContent = item.name;
        document.getElementById('product-price').textContent = `₱${item.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = item.description;
    } else {
        window.location.href='/products';
    }

    addToCart.addEventListener('click', () => {
        if (selectedItem) {
            const item = JSON.parse(selectedItem);
            basket.push(item); // Just push, don't assign
            localStorage.setItem('addedToCart', JSON.stringify(basket));
            alert('Item added to cart!');
        }
    });
});