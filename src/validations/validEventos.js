const { celebrate, Joi, Segments} = require('celebrate')

module.exports = {
    validEventos(){
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                nome: Joi.string().required(),
                descricao: Joi.string().required(),
                dataEvento: Joi.date().required(),
                IdOrganizador: Joi.number().required()
            })
        })
    }
}