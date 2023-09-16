const express = require("express");
const router = express.Router();

const Event = require('../models/Event.model')
const Chat = require('../models/Chat.model')
const mongoose = require("mongoose");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


router.get("/event", (req, res, next) => {

    let typeFilter = req.query.type;
    // console.log(typeFilter);
    let filter = {};
    if(typeFilter && typeFilter !== 'all'){
        filter = { type: typeFilter}
    }
    
    let citySearch = req.query.city;
    console.log(citySearch);
    console.log(req.query);
    if (citySearch){
        filter = {city: citySearch};
    }

    console.log(filter);

    Event.find(filter)
        .then((eventFromDB) => {
            const eventData = {
                eventList: eventFromDB,
                selectedType: typeFilter || 'all', 
            }    
            res.render('event/event-list', eventData)
        })
        .catch((error) => {
            console.log("error with event From DB eventlist", error)
            next(error);
        })

})

router.get("/event/:id", (req, res, next) => {
    const Id = req.params.id
    //const socket = io();
    
    Event.findById(Id)
        .then((eventFromDB) => {
            //console.log(eventFromDB);

            res.render('event/event-details', {eventId: eventFromDB})
        })
        .catch((error) => {
            console.log("error with id and details page", error);
            next(error)
        })
})

router.post("/event/:id?", isLoggedIn, (req, res, next) => {
    const Id = req.params.id

    const user = req.session.currentUser.username

    const infoChat = {
        content: req.body.content,
        user: user,
        eventId: Id,
    }


    Event.findById(Id)
        .then((messageInfo) => {

                if (!messageInfo) {
                    return res.status(404).json({ error: 'Événement introuvable.' });
                }

        const newChat = new Chat(infoChat)

        newChat.save();
        

        })
        .catch((error) => {
        res.status(500).json({ error: "We have an error with the message creation", error})
    })


});

module.exports = router;