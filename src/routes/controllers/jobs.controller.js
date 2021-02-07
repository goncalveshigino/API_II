 const Job = require('../../models').Job
 const ResourceController = require('./resource.controller')


 class JobsController extends ResourceController {

     constructor() {
         super()
         this.setModel(Job)
     }

 }
 module.exports = new JobsController