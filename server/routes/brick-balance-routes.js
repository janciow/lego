const express = require('express');
const brickBalanceControllers = require('../controllers/brick-balance-controllers');
const router = express.Router();

router.get("/:setNumber", brickBalanceControllers.getbrickBalanceBySet);
router.get("/:setNumber/group", brickBalanceControllers.getbrickBalanceBySetsGoup);
router.get("/lego-pirates-ship-brick-list/:setNumber", brickBalanceControllers.legoPiratesShipBrickList);
router.get("/lego-star-wars-clone-ship-brick-list/:setNumber", brickBalanceControllers.legoSWCloneShipBrickList);

module.exports = router