require('dotenv').config();
const express = require('express');
const Commerce = require('@chec/commerce.js');

const app = express();
const commerce = new Commerce(process.env.NEXT_PUBLIC_CHEC_PUBLIC_KEY, process.env.NEXT_PUBLIC_CHEC_SECRET_KEY);
// UNCOMMENT: const cors = require('cors');
// UNCOMMENT: app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    try {
        const products = await commerce.products.list();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api-key', (req, res) => {
    res.json({ apiKey: process.env.COMMERCE_SECRET_KEY });
});

app.post('/api/create-customer', async (req, res) => {
    try {
        const { email } = req.body;
        const customer = await commerce.customers.create({ email });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
//COMMAND: node server.js
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});