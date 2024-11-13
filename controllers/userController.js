const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// register
exports.registerController = async (req,res)=>{
    console.log("Inside Register Controller");
    console.log(req.body);
    const {userId,firstName,lastName,email,password,phoneNumber} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("You are already registered!!!")
        }else{
            const encrypted = await bcrypt.hash(password,10)
            const newUser = new users({
                userId,firstName,lastName,email,password:encrypted,phoneNumber
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
   
}

// login
exports.loginController = async (req,res)=>{
    console.log("Inside loginController");
    const {email,password} = req.body
    // console.log(email,password);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            const isMatch = await bcrypt.compare(password,existingUser.password)
            if(isMatch){
                const token = jwt.sign({loginId:existingUser._id},process.env.JWTPASSWORD)
                res.status(200).json({
                user:existingUser,token
            })
            }else{
                res.status(404).json("Incorrect Password!!!")
            }
        }else{
            res.status(404).json("Incorrect Email / Password!!!")
        }
    }catch(err){
        res.status(401).json(err)
    }
   
}

// List all users 
exports.allUsersViewController = async (req,res)=>{
    console.log("Inside viewController");
    try{
        const allUsers = await users.find()
        res.status(200).json(allUsers.map(user=>({firstName:user.firstName, lastName:user.lastName, email:user.email})));
    }catch(err){
        res.status(401).json(err)
    }
}

// List single user details
exports.singleUserViewController = async (req,res)=>{
    console.log("Inside singleUserViewController");
    const loginId = req.loginId
    try{
        const singleUser = await users.find({_id:loginId})
        if(singleUser){
            res.status(200).json(singleUser.map(user=>({userId:user.userId, firstName:user.firstName, lastName:user.lastName, email:user.email, phoneNumber:user.phoneNumber})))
        }else{
            res.status(404).json("User not found!!!")
        }
    }catch(err){
        res.status(401).json(err)
    }
    
}