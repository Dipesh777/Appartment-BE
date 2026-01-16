const User = require('../models/user.model')
const bcrypt = require('bcrypt');

module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // verify required fields
        if (!(name && email && password)) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // encrypt the password before saving to database
        const encryptedPassword = await bcrypt.hash(password, 10);
        const userData = { name, email, password: encryptedPassword };
        const user = await User.Create(userData);
        return res.status(201).json({ message: "User Registerd Successfully", user })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error while Registering User", error: error.message })
    }
}

module.exports.loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        // verify required fields
        if (!(email && password)) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found. please register first" })
        }

        // compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "please check your userID and password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({ message: "login successful", token })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error while logging in", error: error.message })
    }
}