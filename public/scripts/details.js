document.addEventListener('DOMContentLoaded', () => {
    const selectedItem = localStorage.getItem('selectedProduct')
    if(selectedItem){
        const item = JSON.parse(selectedItem)
        document.getElementById('product-image').src = item.image
        document.getElementById('product-name').textContent = item.name
        document.getElementById('product-price').textContent = `₱${item.price.toFixed(2)}`
        document.getElementById('product-description').textContent = item.description
    }else{
        window.location.href='/products'
    }
})