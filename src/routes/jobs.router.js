var express = require('express');
var router = express.Router();


const JobsController = require('./controllers/jobs.controller')

const verifyAccessToken = require('./middlewares/verifyAcessToken.middlewares')
const verifyJobOwner = require('./middlewares/verifyJobOwner.middlewares')


const onlyAllowsOwner = [verifyAccessToken, verifyJobOwner]


//INDEX
router.get('/', verifyAccessToken, JobsController.bindMethod('index'));
//SHOW
router.get('/:id', verifyAccessToken, JobsController.bindMethod('show'));
//STORE
router.post('/', verifyAccessToken, JobsController.bindMethod('store'));
//UPDATE
router.patch('/:id', onlyAllowsOwner, JobsController.bindMethod('update'));
//DELETE
router.delete('/:id', onlyAllowsOwner, JobsController.bindMethod('remove'));


module.exports = router;