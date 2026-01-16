const express = require('express');
const router = express.Router();
const usersRoutes = require('./users.routes');

// configuring modules route
router.use("/users", usersRoutes);
module.exports = router