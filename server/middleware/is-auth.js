module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.status(403);
    res.json({ data: `Forbidden` });
  } else {
    next();
  }
};
