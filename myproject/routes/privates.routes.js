const express = require('express');
const router = express.Router();

const Event = require('../models/Event.model');

// EDIT EVENT
router.get("/profil/:id/edit", (req, res, next) => {
    const eventId = req.params.id
    // console.log(req.params);
    Event.findById(eventId)
        .then(eventToEdit => {
            res.render('privates/edit-event', {
                event: eventToEdit
            });
        })
        .catch(e => next(e))
})
router.post('/profil/:id/edit', (req, res, next) => {
    const eventId = req.params.id
    // console.log(req.params);
    const editEvent = {
        title: req.body.title,
        place: req.body.place,
        date: req.body.date,
        description: req.body.description,
        pictures: req.body.pictures,
        likes: req.body.likes,
        price: req.body.price
    }
    Event.findByIdAndUpdate(eventId, editEvent, {new: true})
        .then(() => {
            res.redirect('/event/event-details')
            // it think this should redirect to the details of the event we just edited
        })
        .catch(e => next(e))
})


// LIST of EVENTS (in profil)
router.get("/profil", (req, res, next) => {

    Event.find()
        .then((eventFromDB) => {
            const eventData = {
                eventList: eventFromDB
            }    
            res.render('privates/profil', eventData)
        })
        .catch((error) => {
            console.log("error with event From DB profil User", error)
            next(error);
        })

})


// CREATE EVENT
router.get("/profil/create", (req, res, next) => {
    res.render('privates/create-event');
})
router.post('/profil/create', (req, res, next)=>{
    // console.log(req.body);
    const newEvent = {
        title: req.body.title,
        place: req.body.place,
        date: req.body.date,
        description: req.body.description,
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

//DELETE EVENT
router.post("/profil/:id/delete", (req, res, next) => {
    const eventId = req.params.id
    Event.findByIdAndDelete(eventId)
        .then(() => res.redirect('/profil'))
        .catch(e => next(e))
})

router.get("/profil/favorite", (req, res, next) => {
    res.render('privates/favorites-event');
})


module.exports = router;
