// file to define routes
const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userController')
const employeeController = require('../Controllers/employeesController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

// Register API
router.post('/user/register',userController.register)
// login
router.post('/user/login',userController.login)
// add employee
router.post('/employee/add',jwtMiddleware,multerConfig.single('empImage'),employeeController.addEmployee)
// get all project
router.get('/employees/all',jwtMiddleware,employeeController.getAllEmployee)
// get a single employee
router.get('/employees/:id',jwtMiddleware,employeeController.getAEmployee)

module.exports = router