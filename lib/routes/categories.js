const router = require('express').Router();
const Category = require('../models/category');

router
    .post('/:name/categories', (req, res, next) => {
        const category = {
            ...req.body,
            name : req.params.name,
            date: new Date()
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
        return Category.findByIdAndUpdate(req.params.id, {
            $push: { expenses: req.body }
        }, {
            'new': true,
        })
            .then(expense => res.json(expense))
            .catch(next);
    });

// .post('/:id/comments', (req, res, next) => {
//     // update the post document for this id
//     Post.findByIdAndUpdate(req.params.id, {
//         // "push" this comment into post.comments array
//         $push: { comments: req.body }
//     }, { 
//         // we want the "new" (updated) version of the document
//         'new': true, 
//         // run data validation on update
//         runValidators: true 
//     })
//         // return the last comment
//         .then(post => res.json(post.comments[post.comments.length-1]))
//         .catch(next);
// });

module.exports = router;