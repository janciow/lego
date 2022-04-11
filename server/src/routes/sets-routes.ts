import express from "express"
import setsControllers from "../controllers/sets-controllers"
import isAuth  from "../middleware/is-auth"

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

export default router;
