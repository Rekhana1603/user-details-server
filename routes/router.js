const express = require('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const router = new express.Router()

// register : http://localhost:3000/register
router.post('/register',userController.registerController)

// login : http://localhost:3000/login
router.post('/login',userController.loginController)

// view all users : http://localhost:3000/view-all
router.get('/view-all',jwtMiddleware,userController.allUsersViewController)

// view single user details : http://localhost:3000/view/user
router.get('/view-user',jwtMiddleware,userController.singleUserViewController)

module.exports = router