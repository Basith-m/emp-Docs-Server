const employees = require('../Models/employeeSchema')

// add employees
exports.addEmployee = async (req,res)=>{
    console.log("Inside add employee function");
    const userId = req.payload
    const employeeImage = req.file.filename
    // console.log(employeeImage);
    // console.log(`${userId}`);
    const {name,empID,position,DOB,gender,address,joinDate,salary} = req.body
    // console.log(`${name},${empID},${position},${DOB},${gender},${address},${joinDate},${salary},${employeeImage}`);
    try{
        // check the employee already exist
        const existingEmployee = await employees.findOne({userId})
        if(existingEmployee){
            res.status(406).json("Employee already exist!!!")
        }else{
            // add/insert employee
            const newEmployee = new employees({
                name,employeeID:empID,position,DOB,gender,address,joinDate,salary,empImage:employeeImage
            })
            // store in mongoDB collection
            await newEmployee.save()
            res.status(200).json(newEmployee)
        }
    }catch(err){
        res.status(401).json(`Request Failed!!! Error : ${err}`)
    }
}
