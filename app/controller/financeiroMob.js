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
			data.link_sistema = '/mobsmart';
			console.log('FFFFFFFFFFFFFFFFFFFF FINANCEIRO FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
			console.log(data);
			console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'financeiro/financeiro', data: data, usuario: req.session.usuario});
		});
	});
	
});

router.get('/extrato', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetExtrato(req.session.usuario.id).then(data_extrato=>{
			data.extrato = data_extrato
	console.log('F_EF_EF_EF_EF_EF_EF_EF_E FINANCEIRO EXTRATO F_EF_EF_EF_EF_EF_EF_EF_E');
			console.log(data);
			console.log('F_EF_EF_EF_EF_EF_EF_EF_EF_EF_EF_EF_EF_EF_EF_EF_EF_EF_EF_EF_EF_EF_EF_');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'financeiro/extrato', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/saque', function(req, res, next) {
	model.GetInvestimentos(req.session.usuario.id).then(data_investimentos=>{
		data.investimento = data_investimentos;		
		console.log('SSSSSSSSSSS FINANCEIRO SAQUE SSSSSSSSSSSSSSSSSSSSSSSSS');
		console.log(data);
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'financeiro/saque', data: data, usuario: req.session.usuario});
	});
});

router.get('/novo_aporte', function(req, res, next) {
	model.GetNomePlanos().then(data_planos=>{
		data.planos = data_planos;
		data.link_sistema = '/mobsmart';
		console.log('TTTTTTTTTTTTTTTT FINANCEIRO APORTE TTTTTTTTTTTTTTTTTTTTTT');
		console.log(data);
		console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'financeiro/novo_aporte', data: data, usuario: req.session.usuario});
	});
});



/* POST enviando o login para verificação. */
router.post('/pedir-saque/', function(req, res, next) {
	POST = req.body;
	console.log(POST);
	POST.senha = control.Encrypt(POST.senha);
	POST.id_usuario = req.session.usuario.id;
	
	POST.valor = POST.valor.replace(',','.');

	if(POST.valor > 0){
		console.log('PPPPPPPPPPPPPPPP PEDIR SAQUE PPPPPPPPPPPPPPPPPPPPPPPP');
		console.log(POST);
		console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');

		model.ConfirmarSenhaUsuario(req.session.usuario.id,POST.senha).then(data_usuario =>{
			delete POST.senha;

			console.log('UUUUUUUUUUUUUUUU DATA USUARIO UUUUUUUUUUUUUUUUU');
			console.log(data_usuario);
			console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');

			if (data_usuario.length > 0){

				model.GetValorTotalPlano(req.session.usuario.id,POST.id_plano).then(data_plano =>{
					console.log('PPPPPPPPPPPPPPPPP DATA PLANO PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
					console.log(data_plano);
					console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');

					console.log('carteira rendimento');
					console.log(data_plano[0].carteira_rendimento);

					console.log('valor');
					console.log(POST.valor);

					console.log(parseFloat(POST.valor) > parseFloat(data_plano[0].carteira_rendimento));

					//Se o valor colocado for maior que o rendimento ele deve zerar o rendimento e fazer a diminuicao do saque
					if(parseFloat(POST.valor) > parseFloat(data_plano[0].carteira_rendimento)){
						var novo_valor_saque = parseFloat(POST.valor) - parseFloat(data_plano[0].carteira_rendimento);

						data_insert = {id_plano:POST.id_plano, valor:parseFloat(data_plano[0].carteira_rendimento), carteira:POST.carteira, tipo:3, id_usuario:POST.id_usuario};
						
						POST.tipo = 1;

						POST.valor = novo_valor_saque;

						console.log('QQQQQQQQQQQQQQQ POST DO SAQUE QQQQQQQQQQQQQQQQQQQQQQQQQQQQ');
						console.log(POST);
						console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ');

						console.log('KKKKKKKKKKKKKKKKKKKKKK POST DO RENDIMENTO SAQUE KKKKKKKKKKKKKKKKKKKKKKKK');
						console.log(data_insert);
						console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK');

						model.CadastrarPedidoSaqueRendimento(data_insert).then(data_valor_saque_rendimento => {
							model.CadastrarPedidoSaque(POST).then(data_pedido_saque => {
								res.json(data_pedido_saque);
							});
						});


					}else{
						//se o valor não for menor só inserir o valor do tipo 3
						POST.tipo = 3;
						model.CadastrarPedidoSaqueRendimento(POST).then(data_pedido_saque => {
							res.json(data_pedido_saque);
						});
					}
				});
			}else{
				res.json({error:'senha_saque_diferente',element:'#senha_saque',texto:'Senha Não Confere!'});
			}

		});
	}else{
		res.json({error:'valor_negativo_zero',element:'input[name="valor"]',texto:'Valor não pode ser 0 ou Negativo!'});
	}
});


router.post('/pedir-aporte/', function(req, res, next) {
	POST = req.body;
	console.log(POST);
	POST.senha = control.Encrypt(POST.senha);
	POST.id_usuario = req.session.usuario.id;
	POST.tipo = 0;
	POST.valor = POST.valor.replace(',','.');


	if(POST.valor > 0){
		
		console.log('PPPPPPPPPPPPPPPP PEDIR APORTE PPPPPPPPPPPPPPPPPPPPPPPP');
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
				res.json({error:'senha_saque_diferente',element:'#senha_saque',texto:'Senha Não Confere!'});
			}
		});

	}else{
		res.json({error:'valor_negativo_zero',element:'input[name="valor"]',texto:'Valor não pode ser 0 ou Negativo!'});
	}
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
