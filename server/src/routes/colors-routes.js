const express = require("express");
const colorsControllers = require("../controllers/colors-controllers");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", isAuth, colorsControllers.getColors);

module.exports = router;
