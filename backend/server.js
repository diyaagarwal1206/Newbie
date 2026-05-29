const bcrypt = require("bcryptjs");
const User = require("./models/user");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected ✅");
})
.catch((error) => {
    console.log(error);
});

app.get("/", (req, res) => {

    res.send("NEWBIE Backend Running ✨");

});

// SIGNUP
app.post("/signup", async (req, res) => {

    try {

        const { name, email, password, gender } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            gender,
            cart: [],
            wishlist: [],
            orderHistory: []
        });

        await newUser.save();

        res.status(201).json({
            message: "User Registered Successfully ✨"
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// LOGIN
app.post("/login", async (req, res) => {

    try{

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){

            return res.status(400).json({
                message: "User not found"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        res.status(200).json({
            message: "Login Successful ✨",
            userId: user._id,
            name: user.name,
            email: user.email
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// ADD TO CART
app.post("/cart/add", async (req, res) => {

    try{

        const { userId, product } = req.body;

        const user = await User.findById(userId);

        if(!user){

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.cart.push(product);

        await user.save();

        res.status(200).json({
            message: "Added to cart 🛒",
            cart: user.cart
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// GET CART
app.get("/cart/:userId", async (req, res) => {

    try{

        const user = await User.findById(req.params.userId);

        if(!user){

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json(user.cart);

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// REMOVE CART ITEM
app.delete("/cart/remove/:userId/:index", async (req, res) => {

    try{

        const user = await User.findById(req.params.userId);

        if(!user){

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.cart.splice(req.params.index, 1);

        await user.save();

        res.status(200).json({
            message: "Item removed",
            cart: user.cart
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// ADD TO WISHLIST
app.post("/wishlist/add", async (req, res) => {

    try{

        const { userId, product } = req.body;

        const user = await User.findById(userId);

        if(!user){

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.wishlist.push(product);

        await user.save();

        res.status(200).json({
            message: "Added to wishlist ❤️",
            wishlist: user.wishlist
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// GET WISHLIST
app.get("/wishlist/:userId", async (req, res) => {

    try{

        const user = await User.findById(req.params.userId);

        if(!user){

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json(user.wishlist);

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// REMOVE WISHLIST ITEM
app.delete("/wishlist/remove/:userId/:index", async (req, res) => {

    try{

        const user = await User.findById(req.params.userId);

        if(!user){

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.wishlist.splice(req.params.index, 1);

        await user.save();

        res.status(200).json({
            message: "Wishlist item removed",
            wishlist: user.wishlist
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// UPDATE PROFILE
app.put("/profile/update", async (req, res) => {

    try{

        const {
            userId,
            phone,
            address,
            dob,
            style,
            size,
            gender
        } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                phone,
                address,
                dob,
                style,
                size,
                gender
            },
            { new: true }
        );

        if(!user){

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json({
            message: "Profile updated successfully 💙",
            user
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// PLACE ORDER
app.post("/order/place", async (req, res) => {

    try{

        const { userId } = req.body;

        const user = await User.findById(userId);

        if(!user){

            return res.status(404).json({
                message: "User not found"
            });

        }

        let total = 0;

        user.cart.forEach((item) => {
            total += Number(item.price);
        });

        const order = {
            items: user.cart,
            total
        };

        user.orderHistory.push(order);

        user.cart = [];

        await user.save();

        res.status(200).json({
            message: "Order placed successfully ✨",
            orderHistory: user.orderHistory
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// GET ORDERS
app.get("/orders/:userId", async (req, res) => {

    try{

        const user = await User.findById(req.params.userId);

        if(!user){

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json(user.orderHistory);

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});