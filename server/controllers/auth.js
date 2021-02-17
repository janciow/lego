const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // res.render('auth/login', {
  //   path: '/login',
  //   pageTitle: 'Login',
  //   isAuthenticated: false
  // });

  res.status(200);
  res.json({ data: 'getLogin ok' });
};

exports.postLogin = (req, res, next) => {
  User.findById('602bb4bf568be5346cd4dc43')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        // res.redirect('/');
        res.status(200);
        res.json({ data: 'ok postLogin' });
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.status(200);
    res.json({ data: 'ok postLogout' });
  });
};
