// check login
// show user email

const userInfo = document.getElementById("user-info");

const userEmail = localStorage.getItem("userEmail");

if(userInfo){

    userInfo.innerHTML = `👤 ${userEmail}`;

}
const isLoggedIn = localStorage.getItem("isLoggedIn");

if(!isLoggedIn){

    window.location.href = "login.html";

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

// CART SYSTEM

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartButtons = document.querySelectorAll(".cart-btn");

const cartCount = document.getElementById("cart-count");

// Update cart count

function updateCartCount() {

    if(cartCount){

        cartCount.innerText = cart.length;
    }
}

updateCartCount();

// Add products to cart
cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productCard = button.parentElement;

        const name =
        productCard.querySelector("h3").innerText;

        const price =
        productCard.querySelector("p").innerText
        .replace("₹","");

        const image =
        productCard.querySelector("img").src;

        const product = {

            name,
            price,
            image
        };

        cart.push(product);

        localStorage.setItem("cart",
        JSON.stringify(cart));

        updateCartCount();

        alert(name + " added to cart 🛒");
    });
});

// WISHLIST SYSTEM

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistButtons =
document.querySelectorAll(".wishlist-btn");

const wishlistCount =
document.getElementById("wishlist-count");

function updateWishlistCount(){

    if(wishlistCount){

        wishlistCount.innerText = wishlist.length;
    }
}

updateWishlistCount();

wishlistButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productCard = button.parentElement;

        const name =
        productCard.querySelector("h3").innerText;

        const price =
        productCard.querySelector("p").innerText
        .replace("₹","");

        const image =
        productCard.querySelector("img").src;

        const product = {

            name,
            price,
            image
        };

        wishlist.push(product);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        updateWishlistCount();

        alert(name + " added to wishlist ❤️");
    });
});

// BUY NOW BUTTONS

const buyButtons =
document.querySelectorAll(".buy-btn");

buyButtons.forEach(button => {

    button.addEventListener("click", () => {

        window.location.href =
        "checkout.html";

    });

});

