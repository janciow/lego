const express = require('express');
const brickBalanceControllers = require('../controllers/brick-balance-controllers');
const router = express.Router();

router.get("/:setNumber", brickBalanceControllers.getbrickBalanceBySet);
router.get("/:setNumber/group", brickBalanceControllers.getbrickBalanceBySetsGoup);
router.get("/lego-pirates-ship-brick-list/:setNumber", brickBalanceControllers.legoPiratesShipBrickList);

module.exports = router