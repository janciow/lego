const MESSAGES = require("../constans/constans");

module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.status(403);
    res.json({ data: MESSAGES.forbidden });
  } else {
    next();
  }
};
