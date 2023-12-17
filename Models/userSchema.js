const mongoose = require('mongoose')
const validator = require('validator')

const userSchama = new mongoose.Schema({
    firm:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate: {
            validator: value => validator.isEmail(value),
            message: 'Invalid Email/Password'
        }
    },
    password:{
        type:String,
        require:true,
        minlength: 6  
    }
})

const users = mongoose.model("users",userSchama)
module.exports = users