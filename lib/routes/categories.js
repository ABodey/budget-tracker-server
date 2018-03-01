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