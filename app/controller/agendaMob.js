// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var AgendaModel = require('../model/agendaModel.js');
var model = new AgendaModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetAporte(req.session.usuario.id).then(data_aporte_todal=>{
			data.aporte_total= data_aporte_todal;
			model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
				data.aporte_primeiro = data_primeiro_aporte;
				data.link_sistema = '/mobsmart';
					console.log('AAAAAAAAAAAAAAAAAAAAA AGENDA AAAAAAAAAAAAAA');
				console.log(data);
				console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'agenda/agenda', data: data, usuario: req.session.usuario});
			});
		});
	});
});


router.get('/eventos', function(req, res, next) {
	model.SelecionarEventos(req.session.usuario.id).then(data => {
		res.json(data);
	});
});


router.get('/editar_evento/:id', function(req, res, next) {
	var id = req.params.id;

	model.SelecionarAgenda(id).then(data_evento => {
		data.evento = data_evento;
		model.GetCoachees(req.session.usuario.id).then(data_coachee=>{
			data.coachee = data_coachee;
			data.link_sistema = '/mobsmart';
			console.log('E_EE_EE_EE_EE_EE_E EDITAR EVENTO E_EE_EE_EE_EE_EE_EE_EE_E');
			console.log(data);
			console.log('E_EE_EE_EE_EE_EE_EE_EE_EE_EE_EE_EE_EE_EE_EE_EE_EE_EE_EE_E');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorLimpo', {html: 'agenda/editar_evento', data: data, usuario: req.session.usuario});
		});
	});
});


router.get('/adicionar-novo-compromisso', function(req, res, next) {
	model.GetCoachees(req.session.usuario.id).then(data_coachee=>{
		data.coachee = data_coachee;
		data.link_sistema = '/mobsmart';
		res.render(req.isAjaxRequest() == true ? 'api' : 'api', {html: 'agenda/cadastrar_evento', data: data, usuario: req.session.usuario});
	});
});

router.get('/lista-coachees', function(req, res, next) {
	model.GetCoachees(req.session.usuario.id).then(data_coachee=>{
		data.coachee = data_coachee;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'agenda/lista_coachees', data: data, usuario: req.session.usuario});
	});
});


/* POST*/
router.post('/cadastrar_evento/', function(req, res, next) {
	POST = req.body;
	POST.id_usuario = req.session.usuario.id;
	model.CadastrarEvento(POST).then(data => {
		res.json(data);
	});
});

router.post('/atualizar_evento/', function(req, res, next) {
	POST = req.body;	
	POST.id_usuario = req.session.usuario.id;

	model.AtualizarEvento(POST).then(data => {
		res.json(data);
	});
});




router.post('/desativar_evento', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarEvento(POST).then(data=> {
		res.json(data);
	});
});



module.exports = router;
