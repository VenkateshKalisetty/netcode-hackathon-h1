const express = require('express');
const router = express.Router();
const userCntlr = require('../controllers/user');

router.post('/', userCntlr.addUser);

module.exports = router;