const express = require("express");
const bricksControllers = require("../controllers/bricks-controllers");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/count", isAuth, bricksControllers.getBrickCount);
router.get("/", isAuth, bricksControllers.getBricks);
router.get("/:brickId", isAuth, bricksControllers.getBrickById);
router.post("/", isAuth, bricksControllers.createLegoBrick);
router.patch(
  "/:elementId/update-total-quantity",
  isAuth,
  bricksControllers.updateLegoBrickQuantity
);

module.exports = router;
