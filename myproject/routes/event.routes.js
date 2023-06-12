const express = require("express");
const router = express.Router();
const Event = require('../models/Event.model')
const mongoose = require("mongoose");

router.get("/event", (req, res, next) => {

    Event.find()
        .then((eventFromDB) => {
            const eventData = {
                eventList: eventFromDB
            }    
            res.render('event/event-list', eventData)
        })
        .catch((error) => {
            console.log("error with event From DB eventlist", error)
            next(error);
        })

})

router.get("/event/:id", (req, res, next) => {
    res.render('event/event-details');
})


module.exports = router;