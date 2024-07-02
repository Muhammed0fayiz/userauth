const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/project')
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });


const schema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    
    },
    place:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})

// collection
const userData=mongoose.model('userData',schema)

module.exports=userData;