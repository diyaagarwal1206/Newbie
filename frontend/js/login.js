const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    try{

        const response = await fetch("https://newbie-backend-rijc.onrender.com/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        alert(data.message);

        if(response.status === 200){

            localStorage.setItem("isLoggedIn", "true");

            localStorage.setItem("userEmail", data.email);

            localStorage.setItem("userId", data.userId);

            window.location.href = "index.html";

        }

    }

    catch(error){

        console.log(error);

        alert("Something went wrong");

    }

});