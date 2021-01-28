 const UserSkills = require('../../models').UserSkill
 const ResourceController = require('./resource.controller')


 class UserSKillsController extends ResourceController {
     constructor() {
         super()
         this.setModel(UserSkills)
     }
 }

 module.exports = new UserSKillsController