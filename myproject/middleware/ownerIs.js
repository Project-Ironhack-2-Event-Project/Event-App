const Event = require('../models/event');

// Afficher les événements créés par l'utilisateur connecté
exports.showProfile = (req, res) => {
  const userId = req.session.users._id; // Récupérer l'ID de l'utilisateur à partir de la session ou du token d'authentification

  Event.find({ userId }, (err, events) => {
    if (err) {
      // Gérer les erreurs
    } else {
      // Renvoyer les événements correspondants à l'utilisateur
      res.render('privates/profil', { events });
    }
  });
};