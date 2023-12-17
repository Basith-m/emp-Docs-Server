const users = require('../Models/userSchema')

// Register
exports.register = async (req,res)=>{
    console.log("Inside Register Controller function");
    const { firm, email, password } = req.body
    // console.log(`${firm}, ${email}, ${password}`);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Account already exist!!!")
        }else{
            const newUser = new users({
                firm, email, password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(`Register API Failed, Error : ${err}`)
    }
}