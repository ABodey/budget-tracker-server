const router = require('express').Router();
const Category = require('../models/Category');

router
    .post('/:name/categories', (req, res, next) => {
        const category = {
            ...req.body,
            user : req.params.name,
            timestamp: new Date()
        };
        return new Category(category).save()
            .then(category => res.json(category))
            .catch(next);
    })

    .get('/:name/categories', (req, res, next) => {
        return Category.find({ user : req.params.name })
            .then(categories => res.json(categories))
            .catch(next);
    })   

    .put('/:name/categories/:id', (req, res, next) => {
        return Category.findOneAndUpdate({ _id: req.params.id, user: req.params.name }, req.body, {new: true})
            .then(updated => res.json(updated))
            .catch(next);
    })

    .delete('/:name/categories/:id', (req, res, next) => {
        return Category.findOneAndRemove({ _id: req.params.id, user: req.params.name })
            .lean()
            .then( () => res.json({ deleted: true }))
            .catch(next);
    })

    .post('/:name/categories/:id/expenses', (req, res, next) => {
        req.body.timestamp = new Date();
        req.body.categoryId = req.params.id;
        return Category.findOneAndUpdate({ _id: req.params.id, user: req.params.name }, {
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
        return Category.findOne({ _id: req.params.id, user: req.params.name })
            .then(category => {
                category.expenses.map( expense => {
                    if (expense._id.toString() === req.params.expId) {
                        Object.keys(req.body).forEach( key => {
                            expense[key] = req.body[key];
                        });
                        expense.id = expense._id;
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
        return Category.findOneAndUpdate({ _id: req.params.id, user: req.params.name }, {
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