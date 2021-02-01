 const UserSkills = require('../../models/userskills')
 const ResourceController = require('./resource.controller')


 class UserSKillsController extends ResourceController {
     constructor() {
         super()
         this.setModel(UserSkills)
     }
 }

 module.exports = new UserSKillsController