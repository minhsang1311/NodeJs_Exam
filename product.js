const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productCode: {
        type: String,
        required: true,
        unique: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productDate: {
        type: Date,
        required: true,
    },
    productOriginPrice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    productStoreCode: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Product', productSchema);
