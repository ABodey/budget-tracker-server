const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    budget: String,
    timestamp: Date,
    name: String,
    expenses: [{
        id: String,
        name: String,
        timestamp: Date,
        price: String,
    }]
});

module.exports = mongoose.model('Category', categorySchema);