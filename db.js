const mongoose = require('mongoose');

const url ='mongodb+srv://product-management:Minh1sang1@cluster0.rvrq5h6.mongodb.net/product-management'
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