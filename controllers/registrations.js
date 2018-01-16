const User = require('../models/user');

function newRoute(req, res) {
  return res.render('registrations/new');
}

function createRoute(req, res, next) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.username}! Now please login.`);
      res.redirect('/login');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest('/register', err.toString());
      }
      next(err);
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
