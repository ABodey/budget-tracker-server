const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    budget: String,
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: 'Expense'
    }]
});

module.exports = mongoose.model('Category', categorySchema);