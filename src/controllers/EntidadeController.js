const connection = require('../database/dbconect')
const dateutils = require('../util/dateutils');

module.exports = {
    async listarOrganizacoes(req, res){
        const {
            offset = 1, 
            limit = 10,
            organizador = 'S',
            doador = 'N' 
        } = req.query;

        const [totalReg] = await connection('entidades').count();
        res.header('X-Total-reg', totalReg['count(*)']);

        const entidades = await connection('entidades')
        .limit(limit)
        .offset((offset - 1 )* limit)
        .where({
            organizador:organizador,
            doador:doador
        })
        .select('*');       

        return res.json(entidades);
    },
    async listarOrganizacao(req, res){
        const { id } = req.params;

        const entidade = await connection('entidades')
        .where('id', id)
        .select('*')
        .first();

        return res.json(entidade);
    },    
    async login(req, res){
        const login = req.headers.usr;
        const senha = req.headers.psw;

        const entidade = await connection('entidades')
        .where({
            login:login,
            senha:senha
        })
        .count('*')
        .first();

        if(entidade['count(*)'] == '0'){
            return res.status(401).json({error:'Usuário ou senha não conferem.'});
        }

        return res.json(entidade);
    },
    async cadastrar(req, res){
        const 
        {
            login, senha, organizador, doador,nome,
            endereco, cpf, cnpj, email, whatsapp, 
            telefone, dadosConta 
        } = req.body;

        const situacao = 'A';
        const dataCadastro = dateutils.dataAgora();

        await connection('entidades').insert({
            login, senha, organizador, doador,nome,
            endereco, cpf, cnpj, email, whatsapp, 
            telefone, dadosConta, situacao, dataCadastro,             
        })
        return res.json({login})
    },
    async inativar(req, res){
        const { id } = req.params;
        
        const regAlterado = await connection('entidades')
        .where('id', id)
        .update({
            situacao:'I'
        })

        if(regAlterado == 0){
            return res.status(400).json({error:'Não foi possível inativar o registro.'})
        }

        return res.json({regAlterado});
    },
    async alterarSenha(req, res){
        const {login, email, senha} = req.body;
        
        const regAlterado = await connection('entidades')
        .where({
            login:login,
            email:email
        })
        .update({
            senha:senha
        })

        if(regAlterado == 0){
            return res.status(400).json({error:'Usuário inválido'});
        }

        return res.json({regAlterado});
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

        const regAlterado = await connection('entidades')
        .where('id', id)
        .update(campos)

        if(regAlterado == 0){
            return res.status(40).json({error:'Não foi possível alterar o registro.'});
        }

        return res.json({regAlterado});
    }

        /*
        campos tabela entidades
        {            
            organizador:organizador, 
            doador:doador,
            nome:nome,
            endereco:endereco, 
            cpf:cpf, 
            cnpj:cnpj, 
            email:email, 
            whatsapp:whatsapp, 
            telefone: telefone, 
            dadosConta:dadosConta         
        } 
        */     
};