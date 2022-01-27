const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI;


 const conn =
    mongoose.Promise = global.Promise;
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log('Connected to mongodb successfully')
    ).catch((error) => {
        console.log('Failed to connect to mongodb', error)
});

module.exports = conn;