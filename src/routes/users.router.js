var express = require('express');
var router = express.Router();

const PortfolioController = require('./controllers/portfolios.controller')
const UsersController = require('./controllers/users.controller')

const UserSkillsController = require('./controllers/userSkills.controller')

const verifyAccessToken = require('./middlewares/verifyAcessToken.middlewares')
const verifyOwner = require('./middlewares/verifyOwner.middlewares')
const upload = require('./middlewares/upload.middleware')

const onlyAllowsOwner = [verifyAccessToken, verifyOwner]

//LOGIN
router.post('/login', UsersController.bindMethod('login'));
//INDEX
router.get('/', verifyAccessToken, UsersController.bindMethod('index'));
//SHOW
router.get('/:id', verifyAccessToken, UsersController.bindMethod('show'));
//STORE
router.post('/', UsersController.bindMethod('store'));
//UPDATE
router.patch('/:id', onlyAllowsOwner, upload.single('pic'), UsersController.bindMethod('update'));
//DELETE
router.delete('/:id', onlyAllowsOwner, UsersController.bindMethod('remove'));


//PORTIFOLIOS

//PORTIFOLIOS INDEX
router.get('/:userId/portfolios', verifyAccessToken, PortfolioController.bindMethod('index'));
//PORTIFOLIOS SHOW
router.get('/:userId/portfolios/:id', onlyAllowsOwner, PortfolioController.bindMethod('show'));
//PORTIFOLIOS STORE
router.post('/:userId/portfolios', onlyAllowsOwner, upload.single('pic'), PortfolioController.bindMethod('store'));
//PORTIFOLIOS UPDATE
router.patch('/:userId/portfolios/:id', onlyAllowsOwner, upload.single('pic'), PortfolioController.bindMethod('update'));
//PORTIFOLIOS REMOVE
router.delete('/:userId/portfolios/:id', onlyAllowsOwner, PortfolioController.bindMethod('remove'));



//Skills STORE
router.post('/:userId/skills', onlyAllowsOwner, UserSkillsController.bindMethod('store'));
//Skills UPDATE
router.patch('/:userId/skills/:id', onlyAllowsOwner, UserSkillsController.bindMethod('update'));
//Skills REMOVE
router.delete('/:userId/skills/:id', onlyAllowsOwner, UserSkillsController.bindMethod('remove'));



module.exports = router;