// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var AdministracaoModel = require('../model/administracaoModel.js');
var model = new AdministracaoModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
			model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
				data.aporte_primeiro = data_primeiro_aporte
				console.log('===================== DATA USUARIO ====================');
				console.log(data);
				console.log('=======================================================');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/administracao', data: data, usuario: req.session.usuario});
			});
	});
});

router.get('/noticias', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
			model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
				data.aporte_primeiro = data_primeiro_aporte
				console.log('===================== DATA USUARIO ====================');
				console.log(data);
				console.log('=======================================================');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'financeiro/saque', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/eventos', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
			model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
				data.aporte_primeiro = data_primeiro_aporte
				console.log('===================== DATA USUARIO ====================');
				console.log(data);
				console.log('=======================================================');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'financeiro/saque', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/plus', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
			model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
				data.aporte_primeiro = data_primeiro_aporte
				console.log('===================== DATA USUARIO ====================');
				console.log(data);
				console.log('=======================================================');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'financeiro/saque', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/porcentagem', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
			model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
				data.aporte_primeiro = data_primeiro_aporte
				console.log('===================== DATA USUARIO ====================');
				console.log(data);
				console.log('=======================================================');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'financeiro/saque', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/usuario', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
			model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
				data.aporte_primeiro = data_primeiro_aporte
				console.log('===================== DATA USUARIO ====================');
				console.log(data);
				console.log('=======================================================');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'financeiro/saque', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/alterar-coach', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
			model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
				data.aporte_primeiro = data_primeiro_aporte
				console.log('===================== DATA USUARIO ====================');
				console.log(data);
				console.log('=======================================================');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'financeiro/saque', data: data, usuario: req.session.usuario});
		});
	});
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	model.GetNoticias().then(data => {
		res.json(data);
	});
});

module.exports = router;
