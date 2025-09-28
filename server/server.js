import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/scripts', express.static(path.join(__dirname, '../public/scripts')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/app", "App.html"));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "Products.html"));
});

// DETAILS PAGE ROUTE - Make sure this path is correct
app.get('/detail', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "Details.html"));
});

// Other routes...
app.get('/rules', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "Rules.html"));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "About.html"));
});

// Add API endpoint to get product data
app.get('/api/products', (req, res) => {
    // You might need to import your products here or use a database
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});