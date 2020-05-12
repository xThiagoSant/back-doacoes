const {Joi, Segments, celebrate} = require('celebrate')

module.exports = {
    validGetEntidades(){
        return celebrate({
            [Segments.QUERY]:{
                offset: Joi.number(),
                limit: Joi.number()
            }       
        })
    },    
};