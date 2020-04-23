const express = require('express');
const EntidadeController = require('./controllers/EntidadeController');
const EventosController = require('./controllers/EventoController');
const DoacaoController = require('./controllers/DoacaoController');

const routes = express.Router();

routes.get('/entidades', EntidadeController.listarOrganizacoes);
routes.get('/entidades/:id', EntidadeController.listarOrganizacao);
routes.put('/entidades/:id', EntidadeController.alterar);
routes.post('/entidades', EntidadeController.cadastrar);
routes.put('/entidades/inativar/:id', EntidadeController.inativar);
routes.put('/mudarsenha', EntidadeController.alterarSenha);
routes.post('/entidades/login', EntidadeController.login);

routes.get('/eventos', EventosController.listarEventos);
routes.get('/eventosorg', EventosController.listarEventosOrg);
routes.post('/eventos', EventosController.cadastrar);
routes.put('/eventos/altsit/:id', EventosController.mudarSituacao);
routes.put('/eventos/:id', EventosController.alterar);

routes.get('/doacoesdoador', DoacaoController.doacoesDoador);
routes.get('/doacoesevento', DoacaoController.doacoesEvento);
routes.put('/doacoes/:id', DoacaoController.alterar);
routes.put('/doacoes/inativar/:id', DoacaoController.inativar);
routes.post('/doacoes', DoacaoController.cadastrar);

module.exports = routes;