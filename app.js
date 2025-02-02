const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/database');
const faqRoutes = require('./routes/faqRoutes');

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", faqRoutes);

module.exports = app;