const {Joi, Segments, celebrate} = require('celebrate')

module.exports = {
    validEntidade(){
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                login: Joi.string().required(),
                senha: Joi.string().required(),
                organizador: Joi.string().required(),
                doador: Joi.string().required(),
                nome: Joi.string().required(),
                endereco: Joi.string().required(),
                cpf: Joi.string().max(11),
                cnpj: Joi.string().max(14),
                email: Joi.string().required().email(),
                whatsapp: Joi.string().required(),
                telefone: Joi.string().required(),
                dadosConta: Joi.string()
            })
        })        
    },
    validLogin(){
        return celebrate({
            [Segments.HEADERS]: Joi.object({
                login: Joi.string().required(),
                senha: Joi.string().required().max(8)
            }).unknown()
        })
    }   
};