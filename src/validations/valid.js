const { celebrate, Segments, Joi} = require('celebrate')

module.exports = {
    validarID(){
        return celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required()
            })
        })
    },
    validPagination(){
        return celebrate({
            [Segments.QUERY]:{
                offset: Joi.number(),
                limit: Joi.number()
            }       
        })
    }    
}