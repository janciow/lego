const express = require('express');
const setsControllers = require('../controllers/sets-controllers');
const router = express.Router();

router.get("/", setsControllers.getSets);
router.get("/:setNumber", setsControllers.getSetById);
router.get("/:setNumber/bricks", setsControllers.getSetBricksById);
router.post("/", setsControllers.createLegoSet);
router.patch("/:legoSetId/bricks/:elementId/quantity-in-set", setsControllers.updatLegoBrickQuantityInSet);

module.exports = router