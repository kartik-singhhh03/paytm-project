const express = require('express');
const userRouter = require('./user');

const router = express.Router();

router.use("/user", userRouter);

module.exports = router;
// This file can be used to define routes for the application in the future.
// /api/v1/users, /api/v1/products, etc.