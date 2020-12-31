const express = require("express");
const router = express.Router();

const { getusers, createuser } = require("../Controller/userMysqlController");

router.get('/user/get', getusers);
router.post('/user/create', createuser);

module.exports = router;
