const express = require('express');
const router = express.Router();


router.get("/profil/:id/edit", (req, res, next) => {
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

router.get("/profil/favorite", (req, res, next) => {
    res.render('privates/favorites-event');
})


module.exports = router;
