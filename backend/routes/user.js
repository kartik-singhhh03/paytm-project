const express = require("express");
const zod = require("zod");
const router = express.Router();
const {User} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");


const signupSchema = zod.object({
  username: zod.string().min(3),
  password: zod.string().min(6),
  firstName: zod.string().min(1),
  lastName: zod.string().min(1),
});

router.post("/signup", async (req, res) => {

    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success){
        return res.status(400).json({message: "email already exists/incorrext  input"});
    }   

    const user =  await User.findOne({
        username: body.username
    })

    if(user && user._id){
        return res.status(400).json({message: "email already exists"}); 

    }

    const dbUser = await  User.create(body);
    const token = jwt.sign({
        id: dbUser._id,
    }, JWT_SECRET, {expiresIn: "1h"});  
    res.cookie("token", token, {
        httpOnly: true,
    }); 
    return res.status(201).json({
        message: "user created successfully", 
       token: token,
    });


});



















module.exports = router;
// This file can be used to define routes for the application in the future.
// /api/v1/users, /api/v1/products, etc.
