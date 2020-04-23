const connection = require('../database/dbconect');

module.exports = {
    async cadastrar(req, res){
        const { 
            doarAlimento, doarDinheiro, doarMaoDeObra,
            dataDaEntrega, descricao, idEvento, idDoador
        } = req.body;

        const situacao = 'A';

        await connection('doacoes').insert({ 
            situacao,
            doarAlimento, doarDinheiro, doarMaoDeObra,
            dataDaEntrega, descricao, idEvento, idDoador
        });

        return res.json({Inform:"Cadastrado com sucesso."});//a idéia é retornar o ID da doação.
    },
    async alterar(req, res){
        const id = req.params;
        const campos = req.body;

        const regAlterado = await connection('doacoes')
        .where('id', id)
        .update(campos);

        if(regAlterado == 0){
            return res.status(400).json({Error:"Não foi possível alterar a doação."});
        };

        return res.status(204).send();
    },
    async inativar(req, res){
        const id = req.params;
        const situacao = 'I';

        const regAlterardo = await connection('doacoes')
        .where('id', id)
        .update({situacao:situacao});

        if(regAlterardo == 0){
            return res.status(400).json({Error:"Não foi possível inativar a doação."})
        };

        return res.status(204).send();
    },
    async doacoesDoador(req, res){
        const {offset=1, limit=10} = req.query;

        const doacoes = await connection('doacoes')
        .limit(limit)
        .offset((offset - 1) * limit)
        .select('*');

        return res.json(doacoes);
    },
    async doacoesEvento(req, res){
        const { offset=1, limit=10 } = req.query;

        const doacoes = await connection('doacoes')
        .limit(limit)
        .offset((offset - 1) * limit)
        .select('*');

        return res.json(doacoes);
    }

/*
{ 
    campos da tabela doacoes

    "doarAlimento":"doarAlimento",
    "doarDinheiro":"doarDinheiro"
    "doarMaoDeObra":"doarMaoDeObra",
    "dataDaEntrega":"dataDaEntrega",
    "descricao":"descricao",
    "idEvento":"idEvento",
    "idDoador":"idDoador"
}
*/

};