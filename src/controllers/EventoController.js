const connection = require('../database/dbconect');

module.exports = {
    async listarEventos(req, res){
        const {offset = 1, limit = 10} = req.query;
        
        const totalReg = await connection('eventos').count();
        res.header('X-Total-Reg', totalReg['count(*)']);

        const Eventos = await connection('eventos')
        .limit(limit)
        .offset((offset - 1) * limit)
        .select('*');

        return res.json(Eventos);
    },
    async listarEventosOrg(req, res){
        const IdOrganizador = req.headers.id;
        const { offiset = 1, limit = 10 } = req.query;

        const eventos = await connection('eventos')
        .limit(limit)
        .offset((offiset - 1) * limit)
        .where({
            IdOrganizador:IdOrganizador
        })
        .select('*');        

        return res.json(eventos);
    },
    async cadastrar(req, res){
        const{ nome, descricao, dataEvento, IdOrganizador } = req.body;
        const situacao = 'A';

        await connection('eventos').insert({
            nome,
            descricao,
            dataEvento,
            IdOrganizador,
            situacao
        })

        return res.json({nome});
    },
    async mudarSituacao(req, res){
        const { id } = req.params;
        const { situacao } = req.body;

        const regAlterado = await connection('eventos')
        .where('id', id)
        .update({
            situacao:situacao
        })

        if(regAlterado == 0){
            return res.status(400).json({error:'Não foi possível mudar a situação.'});
        }

        return res.status(204).send();
    },
    async alterar(req, res){
        const { id } = req.params;
        const campos = req.body;

        const { senha } = campos;
        if(senha != undefined){
            return res.status(400).json({
                Error:"Não é possível alterar o campo senha. Use o recurso alterarSenha."
            })
        };

        const regAlterado = await connection('eventos')
        .where('id', id)
        .update(campos)

        if(regAlterado == 0){
            return res.status(400).json({error:'Não foi possível alterar o evento.'});
        }

        return res.status(204).send();
    }
        /*
        Campos tabela eventos
            {
                "nome":"nome",
                "descricao":"descricao",
                "dataevento":"dataevento"
            }
        */    
};