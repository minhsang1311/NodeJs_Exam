const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db'); // Import db connection
const customer = require('./customer');

const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json())
// Connect to MongoDB
connectDB();
// Parse incoming request bodies (required for POST requests)
app.use(bodyParser.json());
// POST a new product (requires data in request body)
app.post('/customer', async (req, res) => {
    const {customerName, customerPhone} = req.body;
    try {
        const newCustomer = new customer({
            customerName,
            customerPhone,
        });
        const savedCustomer = await newCustomer.save();
        res.json(savedCustomer);
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
const port = process.env.PORT || 8080; // Use environment variable for port or default to 5000

app.listen(port, () => console.log(`Server listening on port ${port}`));
