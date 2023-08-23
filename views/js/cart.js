// Selecciona los elementos del DOM
const cartTableBody = document.querySelector('.cart-table__body');
const cartTotalAmount = document.querySelector('.cart-total__amount');
const cartCheckoutButton = document.querySelector('.cart-checkout');

// Crea una variable para almacenar los productos en el carrito
let cartProducts = [];

// Función para actualizar la tabla del carrito
function updateCartTable() {
    // Limpia el contenido de la tabla
    cartTableBody.innerHTML = '';

    // Agrega una fila por cada producto en el carrito
    cartProducts.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${product.quantity}" min="1" data-index="${index}" class="cart-product-quantity">
            </td>
            <td>$${(product.price * product.quantity).toFixed(2)}</td>
            <td><button data-index="${index}" class="cart-product-remove">Eliminar</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    // Actualiza el total del carrito
    const totalAmount = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    cartTotalAmount.textContent = totalAmount.toFixed(2);
}

// Función para manejar el proceso de finalizar compra
function handleCheckout() {
    // Aquí puedes agregar código para manejar el proceso de finalizar compra
    // Por ejemplo, puedes enviar los datos del carrito a un servidor para procesar el pago y generar una orden de compra
    console.log('Finalizar compra', cartProducts);
}

// Función para manejar el cambio de cantidad de un producto
function handleProductQuantityChange(event) {
    const index = event.target.dataset.index;
    const quantity = event.target.value;
    cartProducts[index].quantity = quantity;
    updateCartTable();
}

// Función para manejar la eliminación de un producto del carrito
function handleProductRemove(event) {
    const index = event.target.dataset.index;
    cartProducts.splice(index, 1);
    updateCartTable();
}

// Agrega listeners a los elementos del DOM
cartTableBody.addEventListener('change', event => {
    if (event.target.classList.contains('cart-product-quantity')) {
        handleProductQuantityChange(event);
    }
});
cartTableBody.addEventListener('click', event => {
    if (event.target.classList.contains('cart-product-remove')) {
        handleProductRemove(event);
    }
});
cartCheckoutButton.addEventListener('click', handleCheckout);

// Ejemplo de cómo agregar productos al carrito
cartProducts.push({ name: 'Producto 1', price: 9.99, quantity: 1 });
cartProducts.push({ name: 'Producto 2', price: 19.99, quantity: 2 });
updateCartTable();
