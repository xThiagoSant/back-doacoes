const {celebrate, Joi, Segments} = require('celebrate')

module.exports = {
    validDoacao(){
        return celebrate({
            [Segments.BODY]:Joi.object().keys({
                doarAlimento: Joi.string().max(1), 
                doarDinheiro: Joi.string().max(1), 
                doarMaoDeObra: Joi.string().max(1),
                dataDaEntrega: Joi.date().required(), 
                descricao: Joi.string(), 
                idEvento: Joi.number().required(), 
                idDoador:Joi.number().required()
            })
        })
    }
};