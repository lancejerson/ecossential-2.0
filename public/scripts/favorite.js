const likedItemsContainer = document.getElementById('liked-items')
const likedItems = localStorage.getItem('liked')
const allLikedItems = JSON.parse(likedItems) || []

document.addEventListener('DOMContentLoaded', () => {
    allLikedItems.forEach(item => {
        const itemContainer = document.createElement('div')
        itemContainer.className = 'flex flex-row justify-center items-center'
        itemContainer.innerHTML = `
            <div>${item.name}</div>
        `
        likedItemsContainer.appendChild(itemContainer)
    })
})

