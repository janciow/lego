const express = require('express');
const bricksControllers = require('../controllers/bricks-controllers');
const router = express.Router();

router.get("/count", bricksControllers.getBrickCount);
router.get("/", bricksControllers.getBricks);
router.get("/:brickId", bricksControllers.getBrickById);
router.post("/", bricksControllers.createLegoBrick);
router.patch("/:elementId/update-total-quantity", bricksControllers.updatLegoBrickQuantity);

module.exports = router