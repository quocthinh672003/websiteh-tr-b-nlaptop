const fs = require('fs');

// Load data từ file
const loadProducts = () => JSON.parse(fs.readFileSync('db.json'));

// Lưu dữ liệu vào file
const saveProducts = (data) => fs.writeFileSync('db.json', JSON.stringify(data, null, 2));

// API Handlers
const getAllProducts = (req, res) => {
    try {
        const products = loadProducts();
        res.json(products);
    } catch (err) {
        res.status(500).send('Error loading products');
    }
};

const addProduct = (req, res) => {
    try {
        const products = loadProducts();
        const newProduct = req.body;
        newProduct.id = Date.now();
        products.push(newProduct);
        saveProducts(products);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).send('Error adding product');
    }
};

const updateProduct = (req, res) => {
    try {
        const products = loadProducts();
        const productId = parseInt(req.params.id, 10);
        const updatedProduct = req.body;
        const index = products.findIndex((p) => p.id === productId);

        if (index !== -1) {
            products[index] = { id: productId, ...updatedProduct };
            saveProducts(products);
            res.json(products[index]);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        res.status(500).send('Error updating product');
    }
};

const deleteProduct = (req, res) => {
    try {
        let products = loadProducts();
        const productId = parseInt(req.params.id, 10);
        products = products.filter((p) => p.id !== productId);
        saveProducts(products);
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Error deleting product');
    }
};

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };
