 const Portfolios = require('../../models').Portfolios
 const ResourceController = require('./resource.controller')




 class PortfolioController extends ResourceController {
     constructor() {
         super()
         this.setModel(Portfolios)
     }

     async update(req, res, next) {
         if (req.file) {
             req.body.pic = req.protocol + '://' + req.headers.host + '/uploads' + req.file.filename
         }
         return await super.update(req, res, next)
     }
 }

 module.exports = new PortfolioController