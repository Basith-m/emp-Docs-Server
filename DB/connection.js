const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas successfully connected with empDocsServer...");
}).catch((err)=>{
    console.log(`MongoDB Connection failed!!! Error : ${err}`);
})