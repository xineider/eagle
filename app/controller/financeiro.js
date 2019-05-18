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
			data.aporte_primeiro = data_primeiro_aporte;
			data.link_sistema = '/sistema';
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
		model.GetExtrato(req.session.usuario.id).then(data_extrato=>{
			data.extrato = data_extrato
			console.log('===================== DATA USUARIO ====================');
			console.log(data);
			console.log('=======================================================');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'financeiro/extrato', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/saque', function(req, res, next) {
	model.GetInvestimentos(req.session.usuario.id).then(data_investimentos=>{
		data.investimento = data_investimentos;
		data.link_sistema = '/sistema';	
		console.log('SSSSSSSSSSSSSSSSS SAQUE SSSSSSSSSSSSSSSSSSSSSSSSS');
		console.log(data);
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'financeiro/saque', data: data, usuario: req.session.usuario});
	});
});

router.get('/novo_aporte', function(req, res, next) {
	model.GetNomePlanos().then(data_planos=>{
		data.planos = data_planos;
		data.link_sistema = '/sistema';
		console.log('===================== DATA USUARIO ====================');
		console.log(data);
		console.log('=======================================================');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'financeiro/novo_aporte', data: data, usuario: req.session.usuario});
	});
});



/* POST enviando o login para verificação. */
router.post('/pedir-saque/', function(req, res, next) {
	POST = req.body;
	console.log(POST);
	POST.senha = control.Encrypt(POST.senha);
	POST.id_usuario = req.session.usuario.id;
	POST.tipo = 1;
	POST.valor = POST.valor.replace(',','.');

	if(POST.valor < 0){
		POST.valor = 0;
	}

	console.log('PPPPPPPPPPPPPPPP PEDIR SAQUE PPPPPPPPPPPPPPPPPPPPPPPP');
	console.log(POST);
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');

	
	model.ConfirmarSenhaUsuario(req.session.usuario.id,POST.senha).then(data_usuario =>{
		delete POST.senha;

		console.log('UUUUUUUUUUUUUUUU DATA USUARIO UUUUUUUUUUUUUUUUU');
		console.log(data_usuario);
		console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');

		if (data_usuario.length > 0){
			model.CadastrarPedidoSaque(POST).then(data_pedido_saque => {
				res.json(data_pedido_saque);
			});
		}else{
			res.json('error_saque_senha_diferente');
		}

	});
});


router.post('/pedir-aporte/', function(req, res, next) {
	POST = req.body;
	console.log(POST);
	POST.senha = control.Encrypt(POST.senha);
	POST.id_usuario = req.session.usuario.id;
	POST.tipo = 0;
	POST.valor = POST.valor.replace(',','.');

	if(POST.valor < 0){
		POST.valor = 0;
	}

	console.log('PPPPPPPPPPPPPPPP PEDIR SAQUE PPPPPPPPPPPPPPPPPPPPPPPP');
	console.log(POST);
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');


	
	model.ConfirmarSenhaUsuario(req.session.usuario.id,POST.senha).then(data_usuario =>{
		delete POST.senha;

		console.log('UUUUUUUUUUUUUUUU DATA USUARIO UUUUUUUUUUUUUUUUU');
		console.log(data_usuario);
		console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');

		if (data_usuario.length > 0){
			model.CadastrarPedidoAporte(POST).then(data_pedido_saque => {
				res.json(data_pedido_saque);
			});
		}else{
			res.json('error_saque_senha_diferente');
		}

	});
});

router.post('/novo_aporte/uploadarcomprovante', function(req, res, next) {
	var sampleFile = req.files.arquivo;
	var nome = control.DateTimeForFile()+'_'+sampleFile.name;

	console.log('SSSSSSSSSSSSSSSSSSS sampleFile SSSSSSSSSSSSSSSSSSSSSS');
	console.log(sampleFile);
	console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./assets/uploads/'+nome, function(err) {
  	if (err) {
  		return res.status(500).send(err);
  	}

  	res.json(nome);
  });
});



module.exports = router;
