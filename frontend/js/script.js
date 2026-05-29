// check login
// show user email
function checkLoginBeforeAction(){

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if(!isLoggedIn){

        alert("Please login first to continue 💙");

        window.location.href = "login.html";

        return false;
    }

    return true;
}
const userInfo = document.getElementById("user-info");

const userEmail = localStorage.getItem("userEmail");

if(userInfo){

    if(userEmail){

        userInfo.innerHTML = `👤 ${userEmail}`;

        userInfo.href = "profile.html";

    }else{

        userInfo.innerHTML = "👤 Profile";

        userInfo.href = "login.html";
    }
}



const logoutBtn = document.getElementById("logout-btn");

if(logoutBtn){

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("isLoggedIn");

        localStorage.removeItem("userEmail");

        window.location.href = "login.html";

    });

}

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");

    if(!searchInput) return;

    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        const products = document.querySelectorAll(".product-card");

        products.forEach((product) => {

            const title = product.querySelector("h3")
            .innerText
            .toLowerCase();

            if(title.includes(value)){

                product.style.display = "";

            }else{

                product.style.display = "none";

            }

        });

    });

});
const saleImage =
document.getElementById("saleImage");

const saleImages = [

    "images/sale.jpeg",

    "images/sale1.jpeg",

    "images/hero3.jpeg",

    

];

let currentSale = 0;

setInterval(() => {

    currentSale++;

    if(currentSale >= saleImages.length){

        currentSale = 0;
    }

    saleImage.src =
    saleImages[currentSale];

}, 3000);


const API_URL = "https://newbie-backend-rijc.onrender.com";

// CART SYSTEM

const cartButtons = document.querySelectorAll(".cart-btn");

const cartCount = document.getElementById("cart-count");

async function updateCartCount(){

    const userId = localStorage.getItem("userId");

    if(!cartCount || !userId){
        if(cartCount){
            cartCount.innerText = 0;
        }
        return;
    }

    try{

        const response = await fetch(`${API_URL}/cart/${userId}`);

        const cart = await response.json();

        cartCount.innerText = cart.length;

    }

    catch(error){

        console.log(error);
    }
}

updateCartCount();

cartButtons.forEach(button => {

    button.addEventListener("click", async () => {

        if(!checkLoginBeforeAction()) return;

        const userId = localStorage.getItem("userId");

        const productCard = button.parentElement;

        const name = productCard.querySelector("h3").innerText;

        const price = productCard.querySelector("p").innerText.replace("₹","");

        const image = productCard.querySelector("img").src;

        const product = {
            name,
            price,
            image
        };

        try{

            const response = await fetch(`${API_URL}/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    product
                })
            });

            const data = await response.json();

            alert(data.message);

            updateCartCount();

        }

        catch(error){

            console.log(error);

            alert("Cart error");
        }

    });

});

// WISHLIST SYSTEM

const wishlistButtons = document.querySelectorAll(".wishlist-btn");

const wishlistCount = document.getElementById("wishlist-count");

async function updateWishlistCount(){

    const userId = localStorage.getItem("userId");

    if(!wishlistCount || !userId){
        if(wishlistCount){
            wishlistCount.innerText = 0;
        }
        return;
    }

    try{

        const response = await fetch(`${API_URL}/wishlist/${userId}`);

        const wishlist = await response.json();

        wishlistCount.innerText = wishlist.length;

    }

    catch(error){

        console.log(error);
    }
}

updateWishlistCount();

wishlistButtons.forEach(button => {

    button.addEventListener("click", async () => {

        if(!checkLoginBeforeAction()) return;

        const userId = localStorage.getItem("userId");

        const productCard = button.parentElement;

        const name = productCard.querySelector("h3").innerText;

        const price = productCard.querySelector("p").innerText.replace("₹","");

        const image = productCard.querySelector("img").src;

        const product = {
            name,
            price,
            image
        };

        try{

            const response = await fetch(`${API_URL}/wishlist/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    product
                })
            });

            const data = await response.json();

            alert(data.message);

            updateWishlistCount();

        }

        catch(error){

            console.log(error);

            alert("Wishlist error");
        }

    });

});

// BUY NOW BUTTONS

const buyButtons = document.querySelectorAll(".buy-btn");

buyButtons.forEach(button => {

    button.addEventListener("click", () => {

        if(!checkLoginBeforeAction()) return;

        window.location.href = "checkout.html";

    });

});

