const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Məpşrutlar (Routes)
const uploadImage = require("./src/utils/uploadImage");
const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router');
const orderRoutes = require('./src/orders/orders.route');
const statsRoutes = require('./src/stats/stats.route');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);

app.get('/', (req, res) => {
  res.send('Lebaba E-commerce Server is running....!');
});

app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.log(err));

module.exports = app;