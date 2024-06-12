let tovar = document.querySelector('.cards')
let desc = document.querySelector(".description")
let products = [
    {
        name: 'oleg',
        image: 'img/oleg.jpg',
        description: 'автомеханік',
    },
    {
        name: 'taras',
        image: 'img/taras.jpg',
        description: 'сантехнік',
    },
    {
        name: 'gavrylo',
        image: 'img/gavrylo.jpg',
        description: 'медвежатник',
    },
];

function createProductCard(product) {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}">
        <p>${product.description}</p>
        <button onclick="openOrderForm('${product.name}')">Order</button>
    `;
    return cardDiv;
}

let cardsContainer = document.querySelector('.cards');

products.forEach(product => {
    let card = createProductCard(product);
    cardsContainer.appendChild(card);
});

function openOrderForm(productName) {
    let orderForm = document.getElementById('order-form');
    orderForm.style.display = 'flex';
    tovar.style.display = 'none';

    document.getElementById('product').value = productName;
}

function submitOrder() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let product = document.getElementById('product').value;
    alert(`Order submitted:\nName: ${name}\nEmail: ${email}\nProduct: ${product}`);
    document.getElementById('order-form').style.display = 'none';
    tovar.style.display = 'flex';
}
function displayProductInfo(){
    
}
