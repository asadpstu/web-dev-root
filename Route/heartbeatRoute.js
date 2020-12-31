const express = require("express");
const router = express.Router();

const { heartbeat, redirect } = require("../Controller/heartbeatController");
const { mysqlAttack } = require('../Controller/mysqlattack');



router.get('/', redirect)
router.get('/heartbeat', heartbeat)
router.get('/attack', mysqlAttack)



module.exports = router;