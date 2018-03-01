const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    budget: String,
    date: Date,
    timestamp: String,
    name: String,
});

module.exports = mongoose.model('Category', categorySchema);
