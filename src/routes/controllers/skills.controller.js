 const Skill = require('../../models').Skill
 const ResourceController = require('./resource.controller')


 class SKillsController extends ResourceController {
     constructor() {
         super()
         this.setModel(Skill)
     }
 }

 module.exports = new SKillsController