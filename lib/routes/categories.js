const router = require('express').Router();
const Category = require('../models/category');
const Expense = require('../models/expense');
const respond = require('../utils/respond');

router
    .post('/:name/categories', (req, res, next) => {
        const category = {
            ...req.body,
            budget : req.params.name
        };
        return Category(category).save()
            .then(category => res.json(category))
            .catch(next);
    })

    .get('/:name/categories', (req, res, next) => {
        return Category.find({ budget : req.params.name }).lean()
            .then(categories => res.json(categories))
            .catch(next);
    })   

    .put('/:name/categories/:id', (req, res, next) => {
        return Category.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean()
            .then(updated => res.json(updated))
            .catch(next);
    })
            
    // .get('/:id', respond(
    //     req => Category.findById(req.params.id)
    //         .lean()
    // ))

    // .delete('/:id', respond(
    //     req => Category.findByIdAndRemove(req.params.id)
    //         .lean()
    //         .then(() => Expense.remove({ category : req.params.id }))
    // ))
;

module.exports = router;