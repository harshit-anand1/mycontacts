const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerUser = asyncHandler(async (req,res)=>{
     const {username, email, password} = req.body;
     if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory"); 
        } 
    const userAvailable  = await User.findOne({email}); 
        if(userAvailable){
            res.status(400);
            throw new Error("User already exists");
        }
        //Hash Password
        const hashedPassword = await bcrypt.hash(password,10);
        console.log("hashed password:",hashedPassword );
   

        //creating new user
        const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      console.log(`User created ${user}`);
      if(user){
        res.status(201).json({_id:user.id, email: user.email});
      }
      else {
        res.status(400);
        throw new Error("User data is not valid");
      }
      res.json({meesage: "Register the user"})
});


//login functionality

const loginUser = asyncHandler(async  (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
        
        res.status(200).json({accessToken});
    }
    res.json({message: "login user"});
});

const currentUser = asyncHandler(async  (req,res)=>{
    res.json({message: "current user"});
});

module.exports = {registerUser, loginUser, currentUser};