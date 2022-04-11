import express from "express"
import bricksControllers from "../controllers/bricks-controllers"

import isAuth from "../middleware/is-auth"

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

export default router;
