import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '/public/')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/app", "App.html"))
})
app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "Products.html"))
});
app.get('/rules', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "Rules.html"))
})
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "About.html"))
})
app.get('/favorites', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "Favorites.html"))
})
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "Cart.html"))
})
app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "Checkout.html"))
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "Login.html"))
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "Signup.html"))
})

app.post('/products', (req, res) => {
    res.redirect("/Products")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
