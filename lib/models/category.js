const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    budget: String,
    expenses: [{
        name: String,
        amount: String
    }]
});

module.exports = mongoose.model('Category', categorySchema);