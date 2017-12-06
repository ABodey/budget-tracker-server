const router = require('express').Router();
const Category = require('../models/category');
const Expense = require('../models/expense');
const respond = require('../utils/respond');

router
    .post('/', respond(
        req => Category(req.body).save()
    ))

    .get('/', respond(
        () => Category.find().lean()
    ))   

    .get('/:id', respond(
        req => Category.findById(req.params.id)
            .lean()
    ))

    .delete('/:id', respond(
        req => Category.findByIdAndRemove(req.params.id)
            .lean()
            //Question: do I need to include this line for any purpose? Would it be considered a best practice?
            // .then(category => ({ removed : !!category }))
            .then(() => Expense.remove({ category : req.params.id }))
    ))

    .put('/:id', respond(
        req => Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .lean()
    ));

module.exports = router;