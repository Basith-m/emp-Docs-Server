const mongoose = require('mongoose')
const validator = require('validator')

const userSchama = new mongoose.Schema({
    firm:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        require:true,
        min: 6  
    }
})

const users = mongoose.model("users",userSchama)
module.exports = users