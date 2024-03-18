const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db'); // Import db connection
const Product = require('./product');

const app = express();

// Connect to MongoDB
connectDB();
app.set('view engine','ejs');
app.set('views','./views');
app.get('/index', function(req,res){
    res.render("index");
})
// Parse incoming request bodies (required for POST requests)
app.use(bodyParser.json());

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ productStoreCode: -1 }); // Sort by store code descending
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST a new product (requires data in request body)
app.post('/api/products', async (req, res) => {
    const { productCode, productName, productDate, productOriginPrice, quantity, productStoreCode } = req.body;
    try {
        const newProduct = new Product({
            productCode,
            productName,
            productDate,
            productOriginPrice,
            quantity,
            productStoreCode,
        });
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = [];
            for (const field in error.errors) {
                validationErrors.push(error.errors[field].message);
            }
            res.status(400).json({ message: 'Validation Error', errors: validationErrors });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
});

// DELETE a product by ID
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product Not Found' });
        }
        res.json({ message: 'Product Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const port = process.env.PORT || 8080; // Use environment variable for port or default to 5000

app.listen(port, () => console.log(`Server listening on port ${port}`));
