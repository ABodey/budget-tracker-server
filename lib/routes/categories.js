const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router
    .post('/', (req, res, next) => {
        new Category(req.body).save()
            .then(category => res.json(category))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Category.find()
            .lean()
            .then(categories => res.json(categories))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Category.findById(req.params.id)
            .lean()
            .then(category=> { 
                if (!category) {
                    res.statusCode = 404;
                    res.send(`id ${req.params.id} does not exist`);
                }
                else res.json(category);
            })
            .catch(next);
    })

    .delete('/:id', (req, res) => {
        Category.findByIdAndRemove(req.params.id)
            .lean()
            .then(result => {
                const exists = result != null;
                res.json({ removed: exists });
            });
    })

    .put('/:id', (req, res, next) => {
        Category.findByIdAndUpdate(req.params.id, req.body)
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;