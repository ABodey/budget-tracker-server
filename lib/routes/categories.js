const express = require('express');
const router = express.Router();
const Category = require('../models/category');

console.log('in categories routes file');

router
    .post('/', (req, res, next) => {
        new Category(req.body).save()
            .then(category => res.json(category))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        console.log('AAAHGJKSHGKSG');
        Category.find()
            .lean()
            .then(categories => res.json(categories))
            .catch(next);
    });

module.exports = router;