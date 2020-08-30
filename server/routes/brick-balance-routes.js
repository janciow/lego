const express = require('express');
const brickBalanceControllers = require('../controllers/brick-balance-controllers');
const router = express.Router();

router.get("/:setNumber", brickBalanceControllers.getbrickBalanceBySet);
router.get("/:setNumber/group", brickBalanceControllers.getbrickBalanceBySetsGoup);

module.exports = router