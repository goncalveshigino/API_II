var express = require('express');
var router = express.Router();


const ApplicationsController = require('./controllers/jobs.controller')

const verifyAccessToken = require('./middlewares/verifyAcessToken.middlewares')
const verifyApplicationOwner = require('./middlewares/verifyApplicationOwner.middlewares')


const onlyAllowsOwner = [verifyAccessToken, verifyApplicationOwner]


//INDEX
router.get('/', verifyAccessToken, ApplicationsController.bindMethod('index'));
//SHOW
router.get('/:id', verifyAccessToken, ApplicationsController.bindMethod('show'));
//STORE
router.post('/', verifyAccessToken, ApplicationsController.bindMethod('store'));
//UPDATE
router.patch('/:id', onlyAllowsOwner, ApplicationsController.bindMethod('update'));
//DELETE
router.delete('/:id', onlyAllowsOwner, ApplicationsController.bindMethod('remove'));


module.exports = router;