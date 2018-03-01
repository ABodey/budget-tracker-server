const chai = require('chai');
const mongoose = require('mongoose');
const request = require('./request');
const assert = chai.assert;


describe('categories', () => {
    beforeEach(() => mongoose.connection.dropDatabase());

    it('should post a new category document with budget = name', () => {
        return request.post('/api/bob/categories')
            .then(response => {
                assert.ok(response.body);
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