// const mongoose = require('../db');
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  desc: { type: String },
  img: { type: String,
    data: Buffer,
    contentType: String },
    size: { type: Number },
    mimetype: { type: String },
    dateCreated: { type: Date, default: Date.now}
}, {collection: 'images'});

module.exports = new mongoose.model('Image', imageSchema);
