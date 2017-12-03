const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    budget: String
});

module.exports = mongoose.model('Category', categorySchema);