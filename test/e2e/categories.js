const chai = require('chai');
const mongoose = require('mongoose');
const request = require('./request');
const assert = chai.assert;


describe('categories', () => {
    beforeEach(() => mongoose.connection.dropDatabase());
    beforeEach(() => Promise.all([
        request.post('/api/candles/categories'),
        request.post('/api/candles/categories'),
        request.post('/api/data/categories'),
        request.post('/api/food/categories'),
        request.post('/api/secret/categories'),
    ]));

    it('should post a new category document with budget = name', () => {
        request.post('/api/food/categories')
            .then( category => {
                assert.equal(category.body.budget, 'food');
            });
    });

    it('should get all categories where budget === name ', () => {
        request.get('/api/candles/categories')
            .then( response => {
                assert.equal(response.body[0].length, 2);
            });
    });


});


// GET /:name/categories - gets all categories where budget === name (full select)
// POST /:name/categories - post a new category document with budget = name
// PUT /:name/categories/:id - update the category document with id
// DELETE /:name/categories/:id - delete category document with id
// POST /:name/categories/:id/expenses - $push the expense into category.expenses field of that id
// PUT /:name/categories/:id/expenses/:id - update the expense of the category with that idea
// DELETE /:name/categories/:id/expenses/:id - $pull the expense with that id out of doc