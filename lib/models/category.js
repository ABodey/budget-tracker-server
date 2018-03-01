const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    budget: String,
    date: Date,
    timestamp: String,
    name: String,
    expenses: [{
        id: String,
        name: String,
        timestamp: Date,
        price: String,
    }]
});

// id a uuid
// categoryId an id that corresponds to an existing category
// timestamp a date from when the category was created
// name a string that is the name of the category
// price a number that is the total amount of $ in the category
// fell free to add more to your expense if you want

module.exports = mongoose.model('Category', categorySchema);
