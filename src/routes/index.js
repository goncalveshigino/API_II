var express = require('express');
var router = express.Router();


const User = require('../models').User
const Skill = require('../models').Skill

/* GET home page. */
router.get('/', async function(req, res, next) {
    const users = await User.findAll();
    res.json(users)
});

module.exports = router;