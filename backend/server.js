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
app.post("/signup", async (req, res) => {

    try {

        const { name, email, password, gender } = req.body;

        // check existing user

        const existingUser = await User.findOne({ email });

        if(existingUser){

            return res.status(400).json({
                message: "User already exists"
            });

        }

        // hash password

        const hashedPassword = await bcrypt.hash(password, 10);

        // create user

        const newUser = new User({

            name,
            email,
            password: hashedPassword,
            gender

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
app.post("/login", async (req, res) => {

    try{

        const { email, password } = req.body;

        // find user

        const user = await User.findOne({ email });

        if(!user){

            return res.status(400).json({
                message: "User not found"
            });

        }

        // compare password

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        res.status(200).json({
            message: "Login Successful ✨"
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});
const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});