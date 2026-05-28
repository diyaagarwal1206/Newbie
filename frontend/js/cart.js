const cartItems = document.getElementById("cart-items");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.forEach((item, index) => {

    const div = document.createElement("div");

    div.classList.add("product-card");

    div.innerHTML = `

        <h3>${item.name}</h3>

        <p>₹${item.price}</p>

        <button onclick="removeItem(${index})">
            Remove
        </button>

    `;

    cartItems.appendChild(div);

});

function removeItem(index){

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}

// CHECKOUT BUTTON

const checkoutBtn =
document.getElementById("checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click", () => {

        window.location.href =
        "checkout.html";

    });

}