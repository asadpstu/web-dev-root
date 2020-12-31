const express = require("express");
const router = express.Router();
const { usercreate, userdelete, userupdate } = require("../Controller/userMongoController");


router.post('/create', usercreate);
router.delete('/delete', userdelete);
router.put('/update', userupdate);

module.exports = router;