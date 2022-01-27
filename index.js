require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const conn = require('./db');

// Routes to Handle Request
const imageRoute = require('./routes/routes');

const app = express();


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());

app.use('/public', express.static('public'));
app.use('/api', imageRoute);
app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/zama', (req, res) => {
    res.send('Testing 123');
})

app.use((req, res, next) => {
    // Error goes via next() method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if(!err.statusCode) {
        err.statusCode = 500;
    }
    res.status(err.statusCode).send(err.message);
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});