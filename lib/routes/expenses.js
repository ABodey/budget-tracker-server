const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

router
    .post('/', (req, res, next) => {
        setTimeout(() => new Expense(req.body).save()
            .then(expense => res.json(expense))
            .catch(next), 100);   
    })

    .get('/', (req, res, next) => {
        setTimeout(() => Expense.find()
            .lean()
            .then(expenses => res.json(expenses))
            .catch(next), 
        1000);
    })

    .get('/:id', (req, res, next) => {
        Expense.findById(req.params.id)
            .lean()
            .then(expense=> { 
                if (!expense) {
                    res.statusCode = 404;
                    res.send(`id ${req.params.id} does not exist`);
                }
                else res.json(expense);
            })
            .catch(next);
    })

    .delete('/:id', (req, res) => {
        setTimeout(() => Expense.findByIdAndRemove(req.params.id)
            .lean()
            .then(result => {
                const exists = result != null;
                res.json({ removed: exists });
            }), 1000);
    })

    .put('/:id', (req, res, next) => {
        setTimeout(() => Expense.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(saved => res.send(saved))
            .catch(next), 1000);
    });

module.exports = router;