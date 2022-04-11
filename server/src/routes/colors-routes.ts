import express from "express"
import colorsControllers  from "../controllers/colors-controllers"

import isAuth  from "../middleware/is-auth"

const router = express.Router();

router.get("/", isAuth, colorsControllers.getColors);

export default router;
