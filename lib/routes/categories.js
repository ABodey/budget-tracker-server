const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const respond = require('../utils/respond');

router
    .post('/', respond(
        req => Category.save(req.body).lean()
    ))

    .get('/', respond(
        () => Category.find().lean()
    ))   

    .get('/:id', respond(
        (req) => Category.findById(req.params.id)
            .lean()
    ))

    // .get('/:id', (req, res, next) => {
    //     Category.findById(req.params.id)
    //         .lean()
    //         .then(category=> { 
    //             if (!category) {
    //                 res.statusCode = 404;
    //                 res.send(`id ${req.params.id} does not exist`);
    //             }
    //             else res.json(category);
    //         })
    //         .catch((err) => {
    //             next(err);
    //         });
    // })

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
    });

module.exports = router;