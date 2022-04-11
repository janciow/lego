import express from "express"
import { check, oneOf, validationResult }  from "express-validator"
import  brickBalanceControllers from "../controllers/brick-balance-controllers"
import isAuth  from "../middleware/is-auth"

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

export default router;
