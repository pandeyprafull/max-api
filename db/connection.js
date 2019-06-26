const mongoose = require('mongoose');
const dbConfig = require('../utils/config').url;
mongoose.connect(dbConfig,(err)=>{
    if(err){
        console.log("Connection not created !!!!",err)
    }
    else{
        console.log("connection created successfully....")
    }
})
module.exports = mongoose;