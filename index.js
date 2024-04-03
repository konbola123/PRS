const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/search');


const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB: ', err);
    });

app.use(bodyParser.json());

// Routes
app.use('/search', searchRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
