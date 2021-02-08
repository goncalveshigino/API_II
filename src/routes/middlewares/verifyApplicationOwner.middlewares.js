const Application = require('../../models').Application
const errorResponse = require('../responses/error.response')

module.exports = async(req, res, next) => {

    try {
        const application = await Application.getId(req.params.id)


        if (application.userId !== req.body.user.id) {
            return errorResponse(res, 400, 'Voce nao tem permisao para acessar esse recurso')
        }

        next()
    } catch (error) {

        return errorResponse(res, 404, 'Application nao encontrado.', error)
    }

}