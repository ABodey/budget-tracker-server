const router = require('express').Router();
const Expense = require('../models/expense');
const respond = require('../utils/respond');

router
    .post('/', respond(
        req => Expense(req.body).save()
    ))

    .get('/', respond(
        () => Expense.find().lean()
    ))   

    .get('/:id', respond(
        req => Expense.findById(req.params.id)
            .lean()
    ))

    .delete('/:id', respond(
        req => Expense.findByIdAndRemove(req.params.id)
            .lean()
            .then(expense => ({ removed : !!expense }))
    ))

    .put('/:id', respond(
        req => Expense.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .lean()
    ));

module.exports = router;