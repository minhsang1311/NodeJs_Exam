const mongoose = require('mongoose');

const url ='mongodb+srv://sangnnmsec:minh1sang1@minhsang.l9mkxog.mongodb.net/?retryWrites=true&w=majority&appName=MinhSang'
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url, {
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;