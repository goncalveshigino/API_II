var express = require('express');
var router = express.Router();


const ApplicationController = require('./controllers/applications.controller')

const verifyAccessToken = require('./middlewares/verifyAcessToken.middlewares')
const verifyApplicationOwner = require('./middlewares/verifyApplicationOwner.middlewares')


const onlyAllowsOwner = [verifyAccessToken, verifyApplicationOwner]


//INDEX
router.get('/', verifyAccessToken, ApplicationController.bindMethod('index'));
//SHOW
router.get('/:id', verifyAccessToken, ApplicationController.bindMethod('show'));
//STORE
router.post('/', verifyAccessToken, ApplicationController.bindMethod('store'));
//UPDATE
router.patch('/:id', onlyAllowsOwner, ApplicationController.bindMethod('update'));
//DELETE
router.delete('/:id', onlyAllowsOwner, ApplicationController.bindMethod('remove'));


module.exports = router;