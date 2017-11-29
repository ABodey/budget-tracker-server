const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({

    name: String,
    budget: String,
    timestamp: Date,

});

module.exports = mongoose.model('Category', categorySchema);