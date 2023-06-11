const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

router.get("/event", (req, res, next) => {
    res.render('event/event-list')
})


module.exports = router;