const express = require("express");
const router = express.Router();
const Event = require('../models/Event.model')
const mongoose = require("mongoose");

router.get("/event", (req, res, next) => {

    let typeFilter = req.query.type;
    // console.log(typeFilter);
    let filter = {};
    if(typeFilter && typeFilter !== 'all'){
        filter = { type: typeFilter}
    }
    
    let citySearch = req.query.search;
    console.log(citySearch);
    if (citySearch){
        filter = {city: citySearch};
    }



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


module.exports = router;