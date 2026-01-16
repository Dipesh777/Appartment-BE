const express = require('express');
const usersRoutes = express.Router();
const { registerUser, loginUser } = require('../controllers/auth.contollers')

// Testing Route
usersRoutes.get("/login", loginUser);
usersRoutes.post("/register", registerUser)
module.exports = usersRoutes;