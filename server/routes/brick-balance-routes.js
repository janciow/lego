const express = require("express");
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
  isAuth,
  brickBalanceControllers.legoSWCloneShipBrickList
);

module.exports = router;
