const Event = require('../models/Event.model');

// Afficher les événements créés par l'utilisateur connecté
exports.showProfile = (req, res) => {
  const eventId = req.params.users
  const userId = req.session.userId; // Récupérer l'ID de l'utilisateur à partir de la session ou du token d'authentification

  Event.find({ userId }, (err, events) => {
    if (err) {
      // Gérer les erreurs
    } else {
      // Renvoyer les événements correspondants à l'utilisateur
      res.render('privates/profil', { events });
    }
  });
};