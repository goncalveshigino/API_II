const Job = require('../../models').Job
const errorResponse = require('../responses/error.response')

module.exports = async(req, res, next) => {
    try {
        const jobId = parseInt(req.params.jobId ? req.params.jobId : req.params.id)


        const job = Job.get(jobId)

        if (job.userId !== req.body.user.Job) {
            return errorResponse(res, 400, 'Voce nao tem permisao para acessar esse recurso')
        }
        req.body.jobId = jobId

        next()
    } catch (error) {
        console.log(error)
        return errorResponse(res, 404, 'Job nao encontrado.', error)
    }
}