 const Application = require('../../models').Application
 const ResourceController = require('./resource.controller')


 class ApplicationController extends ResourceController {

     constructor() {
         super()
         this.setModel(Application)
     }

 }
 module.exports = new ApplicationController