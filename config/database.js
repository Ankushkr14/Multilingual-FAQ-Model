const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async ()=>{
    try{
        
        await mongoose.connect(process.env.DB_URL);
        
        console.log('Connected to database sucessfully.');
    }catch(error){
        console.error('Connection error in database. ', error);
        process.exit(1);
    }
};

module.exports = connectDB;
