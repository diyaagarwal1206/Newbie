const profileForm = document.getElementById("profile-form");

const userEmail = localStorage.getItem("userEmail");
const isLoggedIn = localStorage.getItem("isLoggedIn");

if(!isLoggedIn){
    alert("Please login first to view profile 💙");
    window.location.href = "login.html";
}

document.getElementById("profileEmail").value = userEmail || "";

const savedProfile = JSON.parse(localStorage.getItem("userProfile")) || {};

document.getElementById("profileName").value = savedProfile.name || "";
document.getElementById("profilePhone").value = savedProfile.phone || "";
document.getElementById("profileGender").value = savedProfile.gender || "";
document.getElementById("profileDob").value = savedProfile.dob || "";
document.getElementById("profileAddress").value = savedProfile.address || "";
document.getElementById("profileStyle").value = savedProfile.style || "";
document.getElementById("profileSize").value = savedProfile.size || "";

profileForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const profile = {
        name: document.getElementById("profileName").value,
        email: document.getElementById("profileEmail").value,
        phone: document.getElementById("profilePhone").value,
        gender: document.getElementById("profileGender").value,
        dob: document.getElementById("profileDob").value,
        address: document.getElementById("profileAddress").value,
        style: document.getElementById("profileStyle").value,
        size: document.getElementById("profileSize").value
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));

    alert("Profile updated successfully 💙✨");
});