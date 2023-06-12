const express = require('express');
const router = express.Router();


router.get("/event/:id/edit", (req, res, next) => {
    res.render('privates/edit-event');
})


router.get("/profil", (req, res, next) => {
    res.render('privates/profil');
})



router.get("/profil/create", (req, res, next) => {
    res.render('privates/create-event');
})

router.get("/profil/delete", (req, res, next) => {
    res.render('privates/delete-event');
})

module.exports = router;
