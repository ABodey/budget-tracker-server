const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router
    .post('/', (req, res, next) => {
        setTimeout(() => new Category(req.body).save()
            .then(category => res.json(category))
            .catch(next), 100);
        
    })

    .get('/', (req, res, next) => {
        setTimeout(() => Category.find()
            .lean()
            .then(categories => res.json(categories))
            .catch(next), 
        1000);
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
        setTimeout(() => Category.findByIdAndRemove(req.params.id)
            .lean()
            .then(result => {
                const exists = result != null;
                res.json({ removed: exists });
            }), 1000);
    })

    .put('/:id', (req, res, next) => {
        setTimeout(() => Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(saved => res.send(saved))
            .catch(next), 1000);
    } );

module.exports = router;