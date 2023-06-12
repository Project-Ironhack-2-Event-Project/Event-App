const express = require('express');
const router = express.Router();

const Event = require('..models/Event.model');


router.get("/profil/:id/edit", (req, res, next) => {
    res.render('privates/edit-event');
})


router.get("/profil", (req, res, next) => {
    res.render('privates/profil');
})


// EVENT CREATION
router.get("/profil/create", (req, res, next) => {
    res.render('privates/create-event');
})
router.post('/profil/create', (req, res, next)=>{
    console.log(req.body);
    const newEvent = {
        name: req.body.name,
        place: req.body.place,
        date: req.body.date,
        pictures: req.body.pictures,
        likes: req.body.likes,
        price: req.body.price
    }
    Event.create(newEvent)
        .then((newEvent) => {
            res.redirect('/profil')
        })
        .catch(e => next(e))
})

router.get("/profil/delete", (req, res, next) => {
    res.render('privates/delete-event');
})

router.get("/profil/favorite", (req, res, next) => {
    res.render('privates/favorites-event');
})


module.exports = router;
