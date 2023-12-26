const employees = require('../Models/employeeSchema')

// add employees
exports.addEmployee = async (req, res) => {
    console.log("Inside add employee function");
    const userId = req.payload
    const employeeImage = req.file.filename
    // console.log(employeeImage);
    // console.log(`${userId}`);
    const { name, employeeID,firm, position, DOB, gender, address, joinDate, salary } = req.body
    // console.log(`${name},${employeeID},${firm},${position},${DOB},${gender},${address},${joinDate},${salary},${employeeImage}`);
    try {
        // check the employee already exist
        const existingEmployee = await employees.findOne({ userId })
        if (existingEmployee) {
            res.status(406).json("Employee already exist!!!")
        } else {
            // add/insert employee
            const newEmployee = new employees({
                name, employeeID: employeeID, firm, position, DOB, gender, address, joinDate, salary, empImage: employeeImage
            })
            // store in mongoDB collection
            await newEmployee.save()
            res.status(200).json(newEmployee)
        }
    } catch (err) {
        res.status(401).json(`Request Failed!!! Error : ${err}`)
    }
}

// get all employee
exports.getAllEmployee = async (req, res) => {
    const searchkey = req.query.search
    const firm = req.query.firm
    const query = {
        $and: [
            {
                $or: [
                    { name: { $regex: searchkey, $options: 'i' } },
                    { employeeID: { $regex: searchkey, $options: 'i' } }
                ],
            },
            { firm: { $regex: firm, $options: 'i' } }
        ]
    };
    try {
        const allEmployee = await employees.find(query)
        res.status(200).json(allEmployee)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get a employee
exports.getAEmployee = async (req, res) => {
    const { id } = req.params
    try {
        const employee = await employees.findOne({ employeeID: id })
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee)
    } catch (err) {
        res.status(401).json(err)
    }
}

// edit emplpoyee
exports.editEmployee = async (req, res) => {
    const { id } = req.params
    const userId = req.payload
    const { name, employeeID, position, DOB, gender, address, joinDate, salary,empImage } = req.body
    const employeeImage = req.file?req.file.filename:empImage
    try{
        const employee = await employees.findByIdAndUpdate({_id:id},{
            name,employeeID,position,DOB,gender,address,joinDate,salary,"empImage":employeeImage,userId
        },{new:true})
        await employee.save()
        res.status(200).json(employee)
    }catch(err){
        res.status(401).json(err)
    }
}

// delete employee
exports.deleteEmployee = async (req,res)=>{
    // get employee
    const {id} = req.params
    try{
        const removeEmployee = await employees.findByIdAndDelete({_id:id})
        res.status(200).json(removeEmployee)
    }catch(err){
        res.status(401).json(err)
    }
}
