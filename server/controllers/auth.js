const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  // res.render('auth/login', {
  //   path: '/login',
  //   pageTitle: 'Login',
  //   isAuthenticated: false
  // });

  res.status(200);
  res.json({ data: "getLogin ok" });
};

exports.getSignup = (req, res, next) => {
  // let message = req.flash('error');
  // if (message.length > 0) {
  //   message = message[0];
  // } else {
  //   message = null;
  // }
  // res.render('auth/signup', {
  //   path: '/signup',
  //   pageTitle: 'Signup',
  //   errorMessage: message
  // });

  res.status(200);
  res.json({ data: "getSignup ok" });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(401);
        res.json({
          data: "Invalid email or password.",
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((doMatch) => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save((err) => {
                res.status(200);
                res.json({
                  data: "login successful ",
                });
              });
            }
            res.status(401);
            res.json({
              data: "Invalid email or password.",
            });
          })
          .catch((err) => {
            res.status(500);
            res.json({
              data: "buuu",
            });
          });
      }
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        res.status(401);
        res.json({
          data: "E-Mail exists already, please pick a different one",
        });
      } else {
        return bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            const user = new User({
              email: email,
              password: hashedPassword,
            });
            return user.save();
          })
          .then((result) => {
            res.status(201);
            res.json({ data: `ok` });
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.status(200);
    res.json({ data: "ok postLogout" });
  });
};
