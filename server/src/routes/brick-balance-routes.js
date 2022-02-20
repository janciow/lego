const express = require("express");
const { check, oneOf, validationResult } = require("express-validator");
const brickBalanceControllers = require("../controllers/brick-balance-controllers");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/:setNumber", isAuth, brickBalanceControllers.getBrickBalanceBySet);
router.get(
  "/:setNumber/group",
  isAuth,
  brickBalanceControllers.getBrickBalanceBySetsGroup
);
router.get(
  "/lego-pirates-ship-brick-list/:setNumber",
  isAuth,
  brickBalanceControllers.legoPiratesShipBrickList
);
router.get(
  "/lego-star-wars-clone-ship-brick-list/:setNumber",
  oneOf([
    check("orderBy").isIn([
      "brick.description",
      "total_q",
      "set_7675_q",
      "set_7676_q",
      "set_10195_q",
      "set_75151_q",
    ]),
    check("orderDirection").isIn(["asc", "desc"]),
  ]),
  brickBalanceControllers.legoSWCloneShipBrickList
);

module.exports = router;
