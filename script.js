const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-btn');
const closeCartButton = document.getElementById('close-cart-btn');

let cart = [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        
        // Add item to the cart
        cart.push({ name, price });
        updateCart();
    });
});

closeCartButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
        // Format the cart items for the WhatsApp message
        let message = "Saya ingin melakukan pemesanan Laundry:\n\n";
        let totalPrice = 0;
        
        cart.forEach(item => {
            message += `${item.name}: Rp ${item.price}\n`;
            totalPrice += item.price;
        });

        message += `\nTotal: Rp ${totalPrice}\n\nTolong proses pesanan ini.`;

        // URL encode the message and open WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = "6281111112411"; // Replace with your WhatsApp business phone number
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Redirect to WhatsApp
        window.open(whatsappUrl, "_blank");

        // Clear the cart after checkout
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    } else {
        alert('Keranjang Anda kosong!');
    }
});

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span class="cart-item-price">Rp ${item.price}</span>
        `;
        cartItemsContainer.appendChild(itemElement);

        totalPrice += item.price;
    });

    totalPriceElement.innerText = totalPrice.toLocaleString();
    
    if (cart.length > 0) {
        cartModal.style.display = 'flex';
    } else {
        cartModal.style.display = 'none';
    }
}
