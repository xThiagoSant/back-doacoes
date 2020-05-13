const express = require('express');
const EntidadeController = require('./controllers/EntidadeController');
const EventosController = require('./controllers/EventoController');
const DoacaoController = require('./controllers/DoacaoController');
const ValidEntidade = require('./validations/validEntidades');
const ValidEvento = require('./validations/validEventos');
const ValidDoacao = require('./validations/validDoacao');
const Valid = require('./validations/valid');

const routes = express.Router();

routes.get('/entidades',Valid.validPagination(),EntidadeController.listarOrganizacoes);
routes.get('/entidades/:id', Valid.validarID(), EntidadeController.listarOrganizacao);
routes.put('/entidades/:id', Valid.validarID(), ValidEntidade.validEntidade(), EntidadeController.alterar);
routes.post('/entidades', ValidEntidade.validEntidade() ,EntidadeController.cadastrar);
routes.put('/entidades/inativar/:id', Valid.validarID(), EntidadeController.inativar);
routes.put('/mudarsenha', EntidadeController.alterarSenha);
routes.post('/entidades/login', ValidEntidade.validLogin() ,EntidadeController.login);

routes.get('/eventos',Valid.validPagination(), EventosController.listarEventos);
routes.get('/eventosorg',Valid.validPagination(), EventosController.listarEventosOrg);
routes.post('/eventos', ValidEvento.validEventos(), EventosController.cadastrar);
routes.put('/eventos/altsit/:id', Valid.validarID(), EventosController.mudarSituacao);
routes.put('/eventos/:id', Valid.validarID(), ValidEvento.validEventos(), EventosController.alterar);

routes.get('/doacoesdoador',Valid.validPagination(), DoacaoController.doacoesDoador);
routes.get('/doacoesevento',Valid.validPagination(), DoacaoController.doacoesEvento);
routes.put('/doacoes/:id', ValidDoacao.validDoacao(), Valid.validarID(), DoacaoController.alterar);
routes.put('/doacoes/inativar/:id', Valid.validarID(), DoacaoController.inativar);
routes.post('/doacoes', ValidDoacao.validDoacao(), DoacaoController.cadastrar);

module.exports = routes;