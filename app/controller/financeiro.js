// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var FinanceiroModel = require('../model/financeiroModel.js');
var model = new FinanceiroModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {	
	model.GetValorTotalCarteiraAplicacao(req.session.usuario.id).then(data_valor_carteira =>{
		data.carteira_aplicacao = data_valor_carteira;;	
		model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
			data.aporte_primeiro = data_primeiro_aporte
			console.log('===================== DATA USUARIO ====================');
			console.log(data);
			console.log('=======================================================');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'financeiro/financeiro', data: data, usuario: req.session.usuario});
		});
	});
	
});

router.get('/extrato', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
			model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
				data.aporte_primeiro = data_primeiro_aporte
				console.log('===================== DATA USUARIO ====================');
				console.log(data);
				console.log('=======================================================');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'financeiro/extrato', data: data, usuario: req.session.usuario});
			});
		});
});

router.get('/saque', function(req, res, next) {
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

router.get('/novo_aporte', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
			model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
				data.aporte_primeiro = data_primeiro_aporte
				console.log('===================== DATA USUARIO ====================');
				console.log(data);
				console.log('=======================================================');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'financeiro/novo_aporte', data: data, usuario: req.session.usuario});
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
