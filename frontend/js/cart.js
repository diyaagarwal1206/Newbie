const cartItems = document.getElementById("cart-items");

const totalPrice = document.getElementById("total-price");

const userId = localStorage.getItem("userId");

const API_URL = "https://newbie-backend-rijc.onrender.com";

async function loadCart(){

    if(!userId){

        cartItems.innerHTML = `
            <h2 style="text-align:center; width:100%;">
                Please login to view your cart 🛒
            </h2>
        `;

        return;
    }

    try{

        const response = await fetch(`${API_URL}/cart/${userId}`);

        const cart = await response.json();

        cartItems.innerHTML = "";

        let total = 0;

        if(cart.length === 0){

            cartItems.innerHTML = `
                <h2 style="text-align:center; width:100%;">
                    Your cart is empty 🛒
                </h2>
            `;

            if(totalPrice){
                totalPrice.innerText = "";
            }

            return;
        }

        cart.forEach((item, index) => {

            total += Number(item.price);

            const div = document.createElement("div");

            div.classList.add("product-card");

            div.innerHTML = `
                <img src="${item.image}">

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <button onclick="removeItem(${index})" class="buy-btn">
                    Remove ❌
                </button>
            `;

            cartItems.appendChild(div);

        });

        if(totalPrice){
            totalPrice.innerText = `Total: ₹${total}`;
        }

    }

    catch(error){

        console.log(error);

        cartItems.innerHTML = `
            <h2 style="text-align:center; width:100%;">
                Error loading cart
            </h2>
        `;
    }
}

async function removeItem(index){

    try{

        await fetch(`${API_URL}/cart/remove/${userId}/${index}`, {
            method: "DELETE"
        });

        loadCart();

    }

    catch(error){

        console.log(error);
    }
}

loadCart();