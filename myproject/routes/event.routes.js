const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

router.get("/event", (req, res, next) => {
    res.render('event/event-list')
})

router.get("/event/id", (req, res, next) => {
    res.render('event/event-details');
})


module.exports = router;