module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.session.currentUser) {
    return res.render("auth/login", {errorMessage: "You need to be connected"});
  }

  next();
};
