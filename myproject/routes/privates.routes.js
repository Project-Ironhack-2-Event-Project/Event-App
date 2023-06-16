const express = require('express');
const router = express.Router();

//Add Cloudinary Api
const fileUploader = require('../config/cloudinary.config');

// Add Models
const Event = require('../models/Event.model');
const User = require('../models/User.model')

//Add Middleware
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const isOwner = require("../middleware/isOwner");

// EDIT EVENT
router.get("/profil/:id/edit", isLoggedIn, fileUploader.single('pictures'), (req, res, next) => {
    const eventId = req.params.id
    // console.log(req.params);
    Event.findById(eventId)
        .then(eventToEdit => {
            console.log(eventToEdit);
            res.render('privates/edit-event', {
                eventEdit: eventToEdit
            });
        })
        .catch(e => next(e))
})
router.post('/profil/:id/edit', fileUploader.single('pictures'), (req, res, next) => {
    const eventId = req.params.id
    console.log(req.file);
    
    const userId = req.session.userId
    const usernameOfAuthor = req.session.currentUser.username
    
    // console.log(req.params);
    const editEvent = {
        title: req.body.title,
        place: req.body.place,
        city: req.body.city,
        type: req.body.type,
        date: req.body.date,
        description: req.body.description,
        pictures: req.file ? req.file.path : '../images/div-home1.jpg',
        likes: req.body.likes,
        price: req.body.price,
        users: userId,
        username: usernameOfAuthor,

    }
    Event.findByIdAndUpdate(eventId, editEvent, {new: true})
        .then(() => {
            res.redirect('/profil')
            // it think this should redirect to the details of the event we just edited
        })
        .catch(e => next(e))
})


// LIST of EVENTS (in profil)
router.get("/profil", isLoggedIn , (req, res, next) => {
    const userId = req.session.userId

    Event.find({users: userId}) 
        .then((eventFromDB) => {
            console.log(eventFromDB.users);
            
             return res.render('privates/profil', { userInSession: req.session.currentUser , eventList: eventFromDB})
            
        })
        .catch((error) => {
            console.log("error with event From DB profil User", error)
            next(error);
        })
})


// CREATE EVENT
router.get("/profil/create", isLoggedIn, (req, res, next) => {
    
    res.render('privates/create-event');
})  
router.post('/profil/create', fileUploader.single('pictures'), (req, res, next)=>{
    // console.log(req.body);
    const userId = req.session.userId
    const usernameOfAuthor = req.session.currentUser.username

    newEvent = {
        title: req.body.title,
        place: req.body.place,
        city: req.body.city,
        type: req.body.type,
        date: req.body.date,
        description: req.body.description,
        pictures: req.file ? req.file.path : '../images/div-home1.jpg',
        likes: req.body.likes,
        price: req.body.price,
        users: userId,
        username: usernameOfAuthor,
    }

    Event.create(newEvent)
        .then((newEvent) => {
            res.redirect('/profil')
        })
        .catch(e => next(e))
})

//DELETE EVENT
router.post("/profil/:id/delete", isLoggedIn,(req, res, next) => {
    const eventId = req.params.id
    Event.findByIdAndDelete(eventId)
        .then(() => {
        res.redirect('/profil')
        })
        .catch(e => {
            next(e)
        })
})

router.get("/profil/favorite", isLoggedIn,(req, res, next) => {
    res.render('privates/favorites-event');
})


module.exports = router;
