const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const expenseSchema = new Schema({
    name: String,
    timestamp: Date,
    price: String,
});

const categorySchema = new Schema({
    budget: String,
    timestamp: Date,
    name: String,
    user: String,
    expenses: [expenseSchema]
});

const addId = schema => {
    schema.virtual('id').get(function(){
        return this._id.toHexString();
    });
  
    // Ensure virtual fields are serialised.
    schema.set('toJSON', {
        virtuals: true
    });

    schema.set('toObject', {
        virtuals: true
    });
};

addId(categorySchema);
addId(expenseSchema);

module.exports = mongoose.model('Category', categorySchema);
