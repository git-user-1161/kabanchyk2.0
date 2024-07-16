let tovar = document.querySelector('.cards')
let desc = document.querySelector(".description")
let pidlyva = document.querySelector('.pidlyva')
let info = document.querySelector('.info')
let home = document.querySelector('.home')
let orderblock = document.querySelector('.order-form')
let likedWorker = document.querySelector('.liked-workers')
let cartBlock = document.querySelector('.cart')
let likedBlock = document.querySelector('.like-list')
function getCookieValue(cookieName) {
    // Розділяємо всі куки на окремі частини
    const cookies = document.cookie.split(';')
    // Шукаємо куки з вказаним ім'ям
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim() // Видаляємо зайві пробіли
        // Перевіряємо, чи починається поточне кукі з шуканого імені
        if (cookie.startsWith(cookieName + '=')) {
            // Якщо так, повертаємо значення кукі
            return cookie.substring(cookieName.length + 1) // +1 для пропуску символу
            "="
        }
    }

    return ''
}



class LikedWorker {
    constructor() {
        this.items = {}  // усі товари
        this.loadCartFromCookies()

    }

    // Додавання товару до кошика
    addItem(item) {
        this.items[item.name] = item
        this.saveCartToCookies()
    }
    removeItem(item){
        delete this.items[item.name]
        this.saveCartToCookies()
    }
    saveCartToCookies() {
        let cartJSON = JSON.stringify(this.items);
        document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
    }
    // Завантаження кошика з кукі
    loadCartFromCookies() {
        let cartCookie = getCookieValue('cart');
        if (cartCookie && cartCookie !== '') {
            this.items = JSON.parse(cartCookie);

        }
    }

}
let likedItems = new LikedWorker()
console.log(likedItems)
async function getProducts() {
    // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
    let response = await fetch("db.json")
    // Очікуємо на отримання та розпакування JSON-даних з відповіді
    let products = await response.json()
    // Повертаємо отримані продукти
    return products
};
function openOrderForm(productName) {
    let orderForm = document.getElementById('order-form');
    orderForm.style.display = 'flex';
    tovar.style.display = 'none';

    document.getElementById('product').value = productName;
}
function getCardHTML(product) {
    if (likedItems.items[product.name]){
        return `
        <div class="card">
            <h3>${product.name}</h3>
            <img src="img/${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <div class='btns'>
            <button onclick="openOrderForm('${product.name}')">Order</button>
            <button class="btn like-btn" data-item='${JSON.stringify(product)}'>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" /></svg></button></div>
        </div>
        `
    }
    return `
    <div class="card">
        <h3>${product.name}</h3>
        <img src="img/${product.image}" alt="${product.name}">
        <p>${product.description}</p>
        <div class='btns'>
        <button onclick="openOrderForm('${product.name}')">Order</button>
        <button class="btn like-btn" data-item='${JSON.stringify(product)}'><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg></button></div>
    </div>
    `
}
getProducts().then(function (products) {

    if (tovar) {
        products.forEach(function (product) {
            // Відображаємо товари на сторінці
            tovar.innerHTML += getCardHTML(product)
        })

    }
    let likes = document.querySelectorAll('.like-btn')
    if(likes){
        likes.forEach(function (like) {
            like.addEventListener('click', function (event) {
                
                let itemdata = like.getAttribute('data-item')
                let item = JSON.parse(itemdata)
                if(likedItems.items[item.name]){
                    likedItems.removeItem(item)
                    like.innerHTML = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>'
                }else{
                    likedItems.addItem(item)
                    like.innerHTML = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" /></svg>'
                }
                
            })
        })
    }

    // Отримуємо всі кнопки "Купити" на сторінці
    // let buyButtons = document.querySelectorAll('.products-list .cart-btn');
    // // Навішуємо обробник подій на кожну кнопку "Купити"
    // if (buyButtons) {
    //     buyButtons.forEach(function (button) {
    //         button.addEventListener('click', addToCart)
    //     });
    // }
})


function submitOrder() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let product = document.getElementById('product').value;
    alert(`Order submitted:\nName: ${name}\nEmail: ${email}\nProduct: ${product}`);
    document.getElementById('order-form').style.display = 'none';
    tovar.style.display = 'flex';
}
function displayProductInfo() {

}

function checkSiteInfo() {
    tovar.style.display = 'none';
    info.style.display = 'block';
    orderblock.style.display = 'none';
    cartBlock.style.display = 'none'

}
function hideSiteInfo() {
    tovar.style.display = 'block';
    info.style.display = 'none';
    orderblock.style.display = 'none';
    cartBlock.style.display = 'none'


}
function showLikedWorkers() {
    cartBlock.innerHTML = ''
    for(let name in likedItems.items){
        cartBlock.innerHTML += getCardHTML(likedItems.items[name])
    }
    tovar.style.display = 'none';
    info.style.display = 'none';
    orderblock.style.display = 'none';
    cartBlock.style.display = 'block'



}
pidlyva.addEventListener('click', checkSiteInfo)
home.addEventListener('click', hideSiteInfo)
likedWorker.addEventListener('click', showLikedWorkers)

anime({
    targets: 'like-btn'
})
