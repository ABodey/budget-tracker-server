const router = require('express').Router();
const Category = require('../models/category');

router
    .post('/:name/categories', (req, res, next) => {
        const category = {
            ...req.body,
            name : req.params.name,
            date: new Date()
        };
        return Category(category).save()
            .then(category => res.json(category))
            .catch(next);
    })

    .get('/:name/categories', (req, res, next) => {
        return Category.find({ name : req.params.name }).lean()
            .then(categories => res.json(categories))
            .catch(next);
    })   

    .put('/:name/categories/:id', (req, res, next) => {
        return Category.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean()
            .then(updated => res.json(updated))
            .catch(next);
    })

    .delete('/:name/categories/:id', (req, res, next) => {
        return Category.findByIdAndRemove(req.params.id)
            .lean()
            .then( () => res.json({ deleted: true }))
            .catch(next);
    })

    .post('/:name/categories/:id/expenses', (req, res, next) => {
        return Category.findByIdAndUpdate(req.params.id, {
            $push: { expenses: req.body }
        }, {
            'new': true,
        })
            .then(expense => res.json(expense))
            .catch(next);
    })

    .put('/:name/categories/:id/expenses/:expId', (req, res, next) => {
        return Category.findByIdAndUpdate(req.params.id, (
            { 'expenses.id' : req.params.expId },{ $set: { expenses: req.body } }
            
        ), {
            'new': true,
        })
            .then(expense => res.json(expense))
            .catch(next);
    });

module.exports = router;