const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        mongoose.set('strictQuery',false);//we set this otherwise we are gonna get some errors that we don't want
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected: ${conn.connection.host}`)
    }catch (error) {
        console.log(error);
    }   
}

module.exports = connectDB;