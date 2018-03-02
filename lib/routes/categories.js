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
        return Category.findOneAndUpdate(req.params.id, {
            $push: { expenses: req.body }
        }, {
            'new': true,
        })
            .then(expense => res.json(expense))
            .catch(next);
    })

    // Note.findById(req.params.id)
    //     .then(category => {
    //       const expense = category.expenses.find(e => e._id === req.params.expId);
    //       Object.assign(expense, req.body);

    //       return category.save();
    //     });

    // .put('/:name/categories/:id/expenses/:expId', (req, res, next) => {
    //     return Category.findById(req.params.id)
    //         .then(category => {
    //             const expense = category.expenses.find(e => e._id.toString() === req.params.expId);
    //             const expenses = Object.assign(expense, req.body);

    //             category.expenses = expenses;
    //             return category.save();
    //         })
    //         .then(saved => res.json(saved))
    //         .catch(next);
    // })

    .put('/:name/categories/:id/expenses/:expId', (req, res, next) => {
        return Category.findOne({ _id: req.params.id })
            .then(category => {
                category.expenses.map( expense => {
                    if (expense._id.toString() === req.params.expId) {
                        //TODO: refactor to use Object.assign
                        Object.keys(req.body).forEach( key => {
                            expense[key] = req.body[key];
                        });
                    }
                    return expense;
                });
                return category.save();
            })
            .then(saved => res.json(saved))
            .catch(next);
    })

    .delete('/:name/categories/:id/expenses/:expId', (req, res, next) => {
        return Category.findOneAndUpdate(req.params.id, {
            $pull: { expenses : { _id: req.params.expId } }
        }, {
            'new': true,
        })
            .then(deleted => {
                return res.json(deleted);
            })
            .catch(next);
    });

module.exports = router;