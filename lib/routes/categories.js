const router = require('express').Router();
const Category = require('../models/Category');

router
    .post('/:name/categories', (req, res, next) => {
        const category = {
            ...req.body,
            name : req.params.name,
            timestamp: new Date()
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
        req.body.timestamp = new Date();
        return Category.findOneAndUpdate({ _id: req.params.id }, {
            $push: { expenses: req.body }
        }, {
            'new': true,
        })
            .then(category => {
                return res.json(category.expenses.pop());
            })
            .catch(next);
    })

    .put('/:name/categories/:id/expenses/:expId', (req, res, next) => {
        let updatedExpense = {};
        return Category.findOne({ _id: req.params.id })
            .then(category => {
                category.expenses.map( expense => {
                    if (expense._id.toString() === req.params.expId) {
                        Object.keys(req.body).forEach( key => {
                            expense[key] = req.body[key];
                        });
                        expense.timestamp = new Date();
                        updatedExpense = expense;
                    }
                    return expense;
                });
                return category.save();
            })
            .then(() => {
                res.json(updatedExpense);
            })
            .catch(next);
    })

    .delete('/:name/categories/:id/expenses/:expId', (req, res, next) => {
        return Category.findOneAndUpdate({ _id: req.params.id }, {
            $pull: { expenses : { _id: req.params.expId } }
        }, {
            'new': true,
        })
            .then(deleted => {
                return res.json(deleted.expenses);
            })
            .catch(next);
    });

module.exports = router;