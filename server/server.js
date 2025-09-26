import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../app/App.html")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../app/App.html"))
})
app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, "../src/Products.html"))
});
app.get('/rules', (req, res) => {
    res.sendFile(path.join(__dirname, "../src/Rules.html"))
})
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "../src/About.html"))
})
app.get('/favorites', (req, res) => {
    res.sendFile(path.join(__dirname, "../src/Favorites.html"))
})
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, "../src/Cart.html"))
})

app.post('/products', (req, res) => {
    res.redirect("/products")
})

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
