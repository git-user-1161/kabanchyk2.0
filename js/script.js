let tovar = document.querySelector('.cards')
let desc = document.querySelector(".description")
let pidlyva = document.querySelector('.nav-link')
let info = document.querySelector('.info')


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
    return `
    <div class="card">
        <h3>${product.name}</h3>
        <img src="img/${product.image}" alt="${product.name}">
        <p>${product.description}</p>
        <button onclick="openOrderForm('${product.name}')">Order</button>
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
    // Отримуємо всі кнопки "Купити" на сторінці
    // let buyButtons = document.querySelectorAll('.products-list .cart-btn');
    // // Навішуємо обробник подій на кожну кнопку "Купити"
    // if (buyButtons) {
    //     buyButtons.forEach(function (button) {
    //         button.addEventListener('click', addToCart)
    //     });
    // }
})
Робота

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
    info.style.display = 'flex';

}
pidlyva.addEventListener('click', checkSiteInfo)


