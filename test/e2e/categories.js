const chai = require('chai');
const mongoose = require('mongoose');
const request = require('./request');
const assert = chai.assert;


describe('categories', () => {
    beforeEach(() => mongoose.connection.dropDatabase());
    beforeEach(() => Promise.all([
        request.post('/api/bob/categories'),
        request.post('/api/bob/categories'),
        request.post('/api/tim/categories'),
        request.post('/api/susan/categories'),
        request.post('/api/tairy/categories'),
    ]));

    it('should post a new category document with budget = name', () => {
        return request.post('/api/bobson/categories')
            .then( category => {
                assert.equal(category.body.name, 'bobson');
            });
    });

    it('should get all categories where budget === name ', () => {
        return request.get('/api/bob/categories')
            .then( response => {
                assert.equal(response.body.length, 2);
            });
    });

    it('should update the category document with id', () => {
        let catId = '';
        return request.post('/api/paul/categories')
            .then( category => {
                catId = category._id;
            })
            .then( () => request.post(`/api/paul/categories/${catId}`)
                .send({ budget: 'anime' })
            )
            .then( () => request.get('/api/paul/categories'))
            .then( categories => {
                assert.equal(categories.length, 1);
            });

    });


});

//Get by ID?

// GET /:name/categories - gets all categories where budget === name (full select)
// POST /:name/categories - post a new category document with budget = name
// PUT /:name/categories/:id - update the category document with id
// DELETE /:name/categories/:id - delete category document with id
// POST /:name/categories/:id/expenses - $push the expense into category.expenses field of that id
// PUT /:name/categories/:id/expenses/:id - update the expense of the category with that idea
// DELETE /:name/categories/:id/expenses/:id - $pull the expense with that id out of doc