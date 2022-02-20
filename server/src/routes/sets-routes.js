const express = require("express");
const setsControllers = require("../controllers/sets-controllers");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", isAuth, setsControllers.getSets);
router.get("/:setNumber", isAuth, setsControllers.getSetById);
router.get("/:setNumber/bricks", isAuth, setsControllers.getSetBricksById);
router.post("/", isAuth, setsControllers.createLegoSet);
router.patch(
  "/:legoSetId/bricks/:elementId/quantity-in-set",
  isAuth,
  setsControllers.updateLegoBrickQuantityInSet
);

module.exports = router;
