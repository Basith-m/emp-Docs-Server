const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    employeeID:{
        type:String,
        required:true,
        unique:true
    },
    firm:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    joinDate:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    empImage:{
        type:String,
        required:true 
    }
})

const employees = mongoose.model("employees",employeeSchema)
module.exports = employees