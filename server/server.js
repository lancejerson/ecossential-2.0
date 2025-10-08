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

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "Cart.html"))
})

app.get('/favorites', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "Favorites.html"))
})

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "Checkout.html"))
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});