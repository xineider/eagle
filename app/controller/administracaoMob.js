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
		model.VerSeTemPedidoSaque().then(data_ver_saque=>{
			data.ver_saque = data_ver_saque;
			model.VerSeTemPedidoAporte().then(data_ver_aporte=>{
				data.ver_aporte = data_ver_aporte;
				data.link_sistema = '/mobsmart';
				console.log('ADADADADADADADADADAD ADMINISTRAÇÃO ADADADADADADADADADADAD');
				console.log(data);
				console.log('ADADADADADADADADADADADADADADADADADADADADADADADADADADADADA');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/administracao', data: data, usuario: req.session.usuario});
			});
		});
	});
});

router.get('/noticias', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetNoticias().then(data_noticias=>{
			data.noticias = data_noticias;
			data.link_sistema = '/mobsmart';
			console.log('ADNADNADNADN ADMINISTRAÇÃO NOTICIAS ADNADNADNADNADNADNADNADNADNADNADNADN');
			console.log(data);
			console.log('ADNADNADNADNADNADNADNADNADNADNADNADNADNADNADNADNADNADNADNADNADNADNADNADN');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/noticias/noticias', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/eventos', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
			data.aporte_primeiro = data_primeiro_aporte
			console.log('ADEADEADEADEADEADEADEADEADE ADMINISTRAÇÃO EVENTOS ADEADEADEADEADEADE');
			console.log(data);
			console.log('ADEADEADEADEADEADEADEADEADEADEADEADEADEADEADEADEADEADEADEADEADEADEAD');

			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'financeiro/saque', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/plus', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
			data.aporte_primeiro = data_primeiro_aporte;
			console.log('ADPADPADPADPADP ADMINISTRAÇÃO PLUS ADPADPADPADPADP');
			console.log(data);
			console.log('ADPADPADPADPADPADPADPADPADPADPADPADPADPADPADPADPAD');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'financeiro/saque', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/porcentagem', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
			data.aporte_primeiro = data_primeiro_aporte;
			console.log('ADPADPADPADPADP ADMINISTRAÇÃO PORCENTAGEM ADPADPADPADPADP');
			console.log(data);
			console.log('ADPADPADPADPADPADPADPADPADPADPADPADPADPADPADPADPAD');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'financeiro/saque', data: data, usuario: req.session.usuario});
		});
	});
});


router.get('/coaching', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetCoachings().then(data_coaching=>{
			data.coaching = data_coaching;
			data.link_sistema = '/mobsmart';
			console.log('ADCADCADCADCADCADC ADMINISTRAÇÃO COACHING ADCADCADCADCADCADCADCADCADC');
			console.log(data);
			console.log('ADCADCADCADCADCADCADCADCADCADCADCADCADCADCADCADCADCADCADCADCADCADCADC');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/coachings/coachings', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/avisos', function(req, res, next) {
	model.GetAvisos().then(data_avisos=>{
		data.avisos = data_avisos;
		data.link_sistema = '/mobsmart';
		console.log('ADAADAADAADAADAADAADAADA ADMINISTRAÇÃO AVISOS ADAADAADAADAADAADAADA');
		console.log(data);
		console.log('ADAADAADAADAADAADAADAADAADAADAADAADAADAADAADAADAADAADAADAADAADAADAAD');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/avisos/avisos', data: data, usuario: req.session.usuario});
	});	
});

router.get('/usuarios', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetUsuariosMenosProprio(req.session.usuario.id).then(data_usuarios=>{
			data.usuarios_admin = data_usuarios;
			data.link_sistema = '/mobsmart';
			console.log('===================== ADMINISTRACAO USUARIO ===-================');
			console.log(data);
			console.log('=======================================================');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/usuarios/usuarios', data: data, usuario: req.session.usuario});
		});
	});
});


router.get('/pedidos-saques', function(req, res, next) {
	model.GetPedidosSaques().then(data_pedido_saque=>{
		data.pedido_saque = data_pedido_saque;
		data.link_sistema = '/mobsmart';
		console.log('ADQADQADQADQADQADQADQADQADQADQ ADMINISTRAÇÃO PEDIDO SAQUE ADQADQADQADQADQ');
		console.log(data);
		console.log('ADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQA');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/pedidos-saques/pedidos_saques', data: data, usuario: req.session.usuario});
	});
});

router.get('/pedidos-aportes', function(req, res, next) {
	model.GetPedidosAportes().then(data_pedido_aporte=>{
		data.pedido_aporte = data_pedido_aporte;
		data.link_sistema = '/mobsmart';
		console.log('ADTADTADTADT ADMINISTRAÇÃO PEDIDO APORTE ADTADTADTADTADTADTADTADT');
		console.log(data);
		console.log('ADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTAD');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/pedidos-aportes/pedidos_aportes', data: data, usuario: req.session.usuario});
	});
});


router.get('/caixa', function(req, res, next) {
	model.GetCaixa().then(data_caixa=>{
		data.caixa = data_caixa;
		data.link_sistema = '/mobsmart';
		console.log('CAIXACAIXACAIXACAIXACAIXA ADMINISTRAÇÃO CAIXA CAIXACAIXACAIXA');
		console.log(data);
		console.log('CAIXACAIXACAIXACAIXACAIXACAIXACAIXACAIXACAIXACAIXACAIXACAIXA');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/caixa/caixa', data: data, usuario: req.session.usuario});
	});
});

router.get('/comissoes', function(req, res, next) {
	model.GetComissoes().then(data_comissao=>{
		data.comissao = data_comissao;
		data.link_sistema = '/mobsmart';
		console.log('COMCOMCOMCOMCOMCOMCOM ADMINISTRAÇÃO COMISSOES COMCOMCOMCOMCOM');
		console.log(data);
		console.log('COMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMC');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/comissoes/comissoes', data: data, usuario: req.session.usuario});
	});
});




router.get('/pedidos-rendimentos', function(req, res, next) {
	model.GetPedidosRendimentos().then(data_pedido_rendimento=>{
		data.pedido_rendimento = data_pedido_rendimento;
		data.link_sistema = '/mobsmart';
		console.log('RRRRRRRRRR ADMINISTRAÇÃO RENDIMENTOS RRRRRRRRRRRRRRRRRR');
		console.log(data);
		console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/pedidos-rendimentos/pedidos_rendimentos', data: data, usuario: req.session.usuario});
	});
});

router.get('/porcentagem-comissao', function(req, res, next) {
	model.GetPorcentagemComissao().then(data_porcentagem_comissao=>{
		data.porcentagem_comissao = data_porcentagem_comissao;
		data.link_sistema = '/mobsmart';
		console.log('CCCCCCCCC ADMINISTRAÇÃO COMISSAO CCCCCCCCCCCC');
		console.log(data);
		console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/porcentagem-comissao/porcentagem_comissao', data: data, usuario: req.session.usuario});
	});
});


router.get('/ganhos-mensais', function(req, res, next) {
	model.GetGanhosMensais().then(data_ganho_mensais=>{
		data.ganhos_mensais = data_ganho_mensais;
		data.link_sistema = '/mobsmart';
		console.log('GGGGGGGGGGGG ADMINISTRAÇÃO GANHOS MENSAIS GGGGGGGGGGGGGGG');
		console.log(data);
		console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/ganhos-mensais/ganhos_mensais', data: data, usuario: req.session.usuario});
	});
});




router.get('/alterar-coach', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
			data.aporte_primeiro = data_primeiro_aporte
			console.log('AAAAAAAAAAACCCCC ADMINISTRAÇÃO ALTERAR COACH AAAAAAAAAACCCCCC');
			console.log(data);
			console.log('AAAAAAAAAAAAAAAAAAAAAAAACCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'financeiro/saque', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/lista-coachs', function(req, res, next) {
	model.GetCoach(req.session.usuario.id).then(data_coach=>{
		data.coach = data_coach;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/lista-coach/lista_coach', data: data, usuario: req.session.usuario});
	});
});


router.get('/alterar-senha-usuario/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei alterar a senha do usuario');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarUsuario(id).then(data_usuario_admin => {
		data.usuarios_admin = data_usuario_admin;
		data.link_sistema = '/mobsmart';
		console.log('***************** ADMINISTRAÇÃO ALTERAR SENHA USUARIO ***************');
		console.log(data);
		console.log('*********************************************************************');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/usuarios/alterar_senha_usuario', data: data, usuario: req.session.usuario});
	});
});



/*Cadastrar Administração */

router.get('/noticias/criar', function(req, res, next) {
	data.link_sistema = '/mobsmart';
	res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/noticias/cadastrar_noticia', data: data, usuario: req.session.usuario});
});

router.get('/usuarios/criar', function(req, res, next) {
	model.GetCoach().then(data_coach=>{
		data.coach = data_coach;
		data.link_sistema = '/mobsmart';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/usuarios/cadastrar_usuario', data: data, usuario: req.session.usuario});
	});
});

router.get('/coaching/criar', function(req, res, next) {
	data.link_sistema = '/mobsmart';
	res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/coachings/cadastrar_coaching', data: data, usuario: req.session.usuario});
});

router.get('/avisos/criar', function(req, res, next) {
	data.link_sistema = '/mobsmart';
	res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/avisos/cadastrar_aviso', data: data, usuario: req.session.usuario});
});

router.get('/caixa/criar', function(req, res, next) {
	model.GetUsuarios().then(data_usuario=>{
		data.usuario = data_usuario;
		model.GetPlanos().then(data_plano=>{
			data.plano = data_plano;
			data.link_sistema = '/mobsmart';
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/caixa/cadastrar_caixa', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/comissao/criar', function(req, res, next) {
	model.GetCoach().then(data_usuario=>{
		data.usuario = data_usuario;
		data.link_sistema = '/mobsmart';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/comissoes/cadastrar_comissoes', data: data, usuario: req.session.usuario});
	});
});

/* Editar Administração */


router.get('/noticias/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei a noticia no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarNoticia(id).then(data => {
		data.link_sistema = '/mobsmart';
		console.log('SSSSSSSSSSSSSS SELECIONAR NOTICIA SSSSSSSSSSSSSSSSSSSSSSSS');
		console.log(data);	
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/noticias/editar_noticia', data: data, usuario: req.session.usuario});
	});
});



router.get('/usuarios/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('Selecionei o usuario no editar');
	console.log(id);
	console.log('_________________________________');
	model.GetCoach().then(data_coach=>{
		data.coach = data_coach;
		model.SelecionarUsuario(id).then(data_usuario_sel => {
			data.usuario_admin = data_usuario_sel;
			data.link_sistema = '/mobsmart';
			console.log('EEEEEEEEEEEEEEE USUARIOS EDITAR EEEEEEEEEEEEEEEEEEEE');
			console.log(data);	
			console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/usuarios/editar_usuario', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/coaching/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei a noticia no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarCoaching(id).then(data => {
		data.link_sistema = '/mobsmart';
		console.log('CCCCCCCCCCCCC COACHING EDITAR CCCCCCCCCCCCCCC');
		console.log(data);	
		console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/coachings/editar_coaching', data: data, usuario: req.session.usuario});
	});
});

router.get('/aviso/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei a noticia no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarAviso(id).then(data => {
		data.link_sistema = '/mobsmart';
		console.log('AAAAAAAAAAAA AVISOS EDITAR AAAAAAAAAAAAAAAAA');
		console.log(data);	
		console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/avisos/editar_aviso', data: data, usuario: req.session.usuario});
	});
});


router.get('/pedido-saque/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o pedido-saque no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarPedidoSaque(id).then(data => {
		data.link_sistema = '/mobsmart';
		console.log('QQQQQQQQQQQQQQ PEDIDO SAQUE EDITAR QQQQQQQQQQQQQQQQQQQ');
		console.log(data);	
		console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/pedidos-saques/editar_pedido_saque', data: data, usuario: req.session.usuario});
	});
});


router.get('/pedido-aporte/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o pedido-aporte no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarPedidoAporte(id).then(data => {
		data.link_sistema = '/mobsmart';
		console.log('TTTTTTTTTTTTTTTTTT PEDIDO APORTE EDITAR TTTTTTTTTTTTTTTTTTTT');
		console.log(data);	
		console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/pedidos-aportes/editar_pedido_aporte', data: data, usuario: req.session.usuario});
	});
});

router.get('/pedido-rendimento/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o pedido-rendimento no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarPedidoRendimento(id).then(data => {
		data.link_sistema = '/mobsmart';
		console.log('RRRRRRRRRRRRRRRRR PEDIDO RENDIMENTO EDITAR RRRRRRRRRRRRRRRR');
		console.log(data);	
		console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/pedidos-rendimentos/editar_pedido_rendimento', data: data, usuario: req.session.usuario});
	});
});


router.get('/porcentagem-comissao/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o porcentagem-comissao no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarPorcentagemComissao(id).then(data => {
		data.link_sistema = '/mobsmart';
		console.log('GGGGGGGGGGGGGGG PORCENTAGEM COMISSAO EDITAR GGGGGGGGGGGGGGGG');
		console.log(data);	
		console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/porcentagem-comissao/editar_porcentagem_comissao', data: data, usuario: req.session.usuario});
	});
});

router.get('/caixa/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o porcentagem-comissao no editar');
	console.log(id);
	console.log('_________________________________');
	model.GetUsuarios().then(data_usuario=>{
		data.usuario = data_usuario;
		model.SelecionarCaixa(id).then(data_caixa => {
			data.caixa = data_caixa;
			model.GetPlanos().then(data_plano=>{
				data.plano = data_plano;
				data.link_sistema = '/mobsmart';
				console.log('$$$$$$$$$$$$$$$$$$ CAIXA EDITAR $$$$$$$$$$$$$$$$$');
				console.log(data);	
				console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/caixa/editar_caixa', data: data, usuario: req.session.usuario});
			});
		});
	});
});


router.get('/comissao/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o porcentagem-comissao no editar');
	console.log(id);
	console.log('_________________________________');
	model.GetUsuarios().then(data_usuario=>{
		data.usuario = data_usuario;
		model.SelecionarComissao(id).then(data_comissao => {
			data.comissao = data_comissao;
			data.link_sistema = '/mobsmart';
			console.log('$$$$$$$$$$$$$$$$$$ COMISSAO EDITAR $$$$$$$$$$$$$$$$$');
			console.log(data);	
			console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'administracao/comissoes/editar_comissao', data: data, usuario: req.session.usuario});
		});
	});
});










/* POST enviando o login para verificação. */

/*Cadastrar*/

router.post('/noticias/cadastrar/', function(req, res, next) {
	POST = req.body;
	POST.id_usuario = req.session.usuario.id;	
	model.CadastrarNoticia(POST).then(data => {
		res.json(data);
	});
});

router.post('/coaching/cadastrar/', function(req, res, next) {
	POST = req.body;
	model.CadastrarCoaching(POST).then(data => {
		res.json(data);
	});
});

router.post('/caixa/cadastrar/', function(req, res, next) {
	POST = req.body;

	POST.valor = POST.valor.replace(',','.');

	if(POST.valor < 0){
		POST.valor = 0;
	}



	model.CadastrarCaixa(POST).then(data => {
		res.json(data);
	});
});

router.post('/comissao/cadastrar/', function(req, res, next) {
	POST = req.body;

	POST.valor = POST.valor.replace(',','.');

	if(POST.valor < 0){
		POST.valor = 0;
	}
	
	model.CadastrarComissao(POST).then(data => {
		res.json(data);
	});
});

router.post('/aviso/cadastrar/', function(req, res, next) {
	POST = req.body;
	model.CadastrarAviso(POST).then(data => {
		res.json(data);
	});
});

router.post('/usuarios/cadastrar/', function(req, res, next) {
	POST = req.body;
	var senha = Math.random().toString(36).substr(2, 8);
	POST.senha = senha;

	if(POST.id_coach == undefined){
		POST.id_coach = 0;
	}

	console.log('PPPPPPPPPPOOOOOOOOOOOST USUARIOS POOOOOOSSSSSSSSSTTTTTTTTTTTTTTTT');
	console.log(POST);
	console.log('PPPPPPPPPPPPPPPPOOOOOOOOOOOSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT');

	model.VerificarSeTemLoginDisponivel(POST.login).then(tem_login => {
		console.log('ttttttttttt tem login ttttt');
		console.log(tem_login);
		console.log('ttttttttttttttttttttttttttt');

		if(tem_login == ''){
			model.VerificarSeTemEmailDisponivel(POST.email).then(tem_email => {
				if(tem_email == ''){
					model.CadastrarUsuario(POST).then(data => {
						var html = "Bem vindo ao Eagle Finances. Segue abaixo as informações sobre sua conta."+
						"<br><b>Login:</b> "+POST.login+
						"<br><b>Senha:</b> "+senha+ 
						"<br><br>Recomendamos que você altera sua senha ao acessar o seu perfil ao clicar no menu e ir no item 'Perfil'."+
						"<br>Acesse via o aplicativo Eagle Finance"+
						"<br>Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão."+
						"<br><b>Por-favor não responda essa mensagem, pois ela é enviada automaticamente!</b>";

						var text = "Bem vindo ao Eagle Finances. Segue abaixo as informações sobre sua conta."+
						"<br>Login: "+POST.login+
						"<br>Senha: "+senha+
						"<br><br>Recomendamos que você altera sua senha ao acessar o seu perfil ao clicar no menu e ir no item 'Perfil'."+
						"<br>Acesse via o aplicativo Eagle Finance"+
						"<br>Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão."+
						"<br>Por-favor não responda essa mensagem, pois ela é enviada automaticamente!";


						control.SendMail(POST.email, 'Bem-vindo ao Eagle Finances!',text,html);
						res.json(data);
					});
				}else{
					res.json({error:'possui_email',element:'input[name="email"]',texto:'Email já cadastrado, por-favor inserir outro!'});
				}
			});
		}else{
			console.log('JJJJJJJJJJJJJJJJJJJ já existe login JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ');
			res.json({error:'possui_login',element:'input[name="login"]',texto:'Login existente, tente outro!'});
		}
	});
});

router.post('/usuarios/alterar-senha/', function(req, res, next) {
	POST = req.body;
	var senha = Math.random().toString(36).substr(2, 8);
	POST.senha = senha;

	console.log('USUARIOS ALTERAR-SENHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
	console.log(POST);
	console.log('USUARIOS ALTERAR-SENHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

	model.SelecionarUsuario(POST.id).then(data_usuario => {
		model.AlterarSenhaUsuario(POST).then(senha_alteradao =>{
			var html = "Olá sua senha foi alterada pelo administrador do Sistema Eagle Finances. Segue abaixo as informações sobre sua conta."+
			"<br><b>Login:</b> "+data_usuario[0].login+
			"<br><b>Senha:</b> "+senha+ 
			"<br><br>Recomendamos que você altera sua senha ao acessar o seu perfil ao clicar na imagem no cabeçalho a direita."+
			"<br>Acesse via o aplicativo Eagle Finance"+
			"<br>Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão."+
			"<br><b>Por-favor não responda essa mensagem, pois ela é enviada automaticamente!</b>";

			var text = "Olá sua senha foi alterada pelo administrador do Sistema Eagle Finances. Segue abaixo as informações sobre sua conta."+
			"<br>Login: "+data_usuario[0].login+
			"<br>Senha: "+senha+
			"<br><br>Recomendamos que você altera sua senha ao acessar o seu perfil ao clicar na imagem no cabeçalho a direita."+
			"<br>Acesse via o aplicativo Eagle Finance"+
			"<br>Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão."+
			"<br>Por-favor não responda essa mensagem, pois ela é enviada automaticamente!";
			control.SendMail(data_usuario[0].email, 'Alterado Senha no Eagle Finances!', html, text);
			res.json(data);
		});
	});
});



/* Atualizar*/

router.post('/noticias/atualizar/', function(req, res, next) {
	POST = req.body;	
	if(POST.club == undefined){
		POST.club = 0;
	}	
	model.AtualizarNoticia(POST).then(data => {
		console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAA ATUALIZAR NOTICIAAAAAAAAAAA');
		console.log(data);
		console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
		res.json(data);
	});
});

router.post('/coaching/atualizar/', function(req, res, next) {
	POST = req.body;	
	model.AtualizarCoaching(POST).then(data => {
		res.json(data);
	});
});

router.post('/aviso/atualizar/', function(req, res, next) {
	POST = req.body;	
	model.AtualizarAviso(POST).then(data => {
		res.json(data);
	});
});


router.post('/usuarios/atualizar/', function(req, res, next) {
	POST = req.body;
	console.log('AAAAAAAAA ATUALIZAR USUARIO AAAAAAAAAAAAAA');
	console.log(POST);
	console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
	if(POST.id_coach == undefined){
		POST.id_coach = 0;
	}

	var html = "Olá seu email foi alterado pela administração no Eagle Finances. Segue abaixo as informações sobre sua conta."+
	"<br><b>Login:</b> "+POST.login+
	"<br><br>Caso você não saiba sua senha por-favor contate o suporte."
	"<br>Acesse via o aplicativo Eagle Finance"+
	"<br>Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão."+
	"<br><b>Por-favor não responda essa mensagem, pois ela é enviada automaticamente!</b>";

	var text = "Olá seu email foi alterado pela administração no Eagle Finances. Segue abaixo as informações sobre sua conta."+
	"<br>Login: "+POST.login+
	"<br><br>Caso você não saiba sua senha por-favor contate o suporte."
	"<br>Acesse via o aplicativo Eagle Finance"+
	"<br>Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão."+
	"<br>Por-favor não responda essa mensagem, pois ela é enviada automaticamente!";



	model.VerificarSeTemMesmoLogin(POST).then(tem_mesmo_login => {

		console.log('ttttttttttt tem mesmo login ttttt');
		console.log(tem_mesmo_login);
		console.log('ttttttttttttttttttttttttttt');
		/*verificar se o login foi alterado*/
		if(tem_mesmo_login != ''){
			/*verificar se o email é o mesmo, se não for enviar um e-mail para o novo informando as alterações*/
			model.VerificarSeTemMesmoEmail(POST).then(tem_mesmo_email => {
				console.log('eeeeeeeeeeeeee tem mesmo email eeeeeeeeeeeeeeeeeeeeeeee');
				console.log(tem_mesmo_email);
				console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
				if(tem_mesmo_email != ''){
					model.AtualizarUsuario(POST).then(data => {
						res.json(data);
					});
				}else{
					/*Se o e-mail foi alterado verificar se ele está disponivel(unico)*/
					model.VerificarSeTemEmailDisponivel(POST.email).then(tem_email => {
						if(tem_email == ''){
							model.AtualizarUsuario(POST).then(data => {
								control.SendMail(POST.email, 'E-mail alterado no Eagle Finances!', html, text);
								res.json(data);
							});
						}else{
							res.json({error:'possui_email',element:'input[name="email"]',texto:'Email já cadastrado, por-favor inserir outro!'});
						}
					});
				}
			});
		}else{
			/*caso o login seja alterado ver se o novo tem disponibilidade */
			model.VerificarSeTemLoginDisponivel(POST.login).then(tem_login => {
				console.log('eeeeeeee login novo para ver se é diferente eeeeeee');
				console.log(tem_login);
				console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

				if(tem_login == ''){
					/*se tiver disponibilidade ver se o e-mail foi alterado, se for enviar um e-mail para o novo email*/
					model.VerificarSeTemMesmoEmail(POST).then(tem_mesmo_email => {
						console.log('mmmmmmmmmmmmmmmmaiiiiiiilllllllllllll');
						console.log(tem_mesmo_email);
						console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
						if(tem_mesmo_email != ''){
							model.AtualizarUsuario(POST).then(data => {
								res.json(data);
							});
						}else{
							/*Se o e-mail foi alterado verificar se ele é disponivel(unico)*/
							model.VerificarSeTemEmailDisponivel(POST.email).then(tem_email => {
								if(tem_email == ''){
									model.AtualizarUsuario(POST).then(data => {
										control.SendMail(POST.email, 'E-mail alterado no Eagle Finances!', html, text);
										res.json(data);
									});
								}else{
									res.json({error:'possui_email',element:'input[name="email"]',texto:'Email já cadastrado, por-favor inserir outro!'});
								}
							});
						}
						

					});

				}else{
					res.json({error:'possui_login',element:'input[name="login"]',texto:'Login existente, tente outro!'});
				}

			});
		}
	});
});


router.post('/pedido-saque/confirmar/', function(req, res, next) {
	POST = req.body;
	POST.confirmado = 1;
	console.log('SQQQQQQQQ CONFIRMAR PEDIDO SAQUE  SSSSSSSSQQQQQQ');
	console.log(POST);
	console.log('SQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ');
	model.AtualizarPedidoSaque(POST).then(data => {
		res.json(data);
	});
});

router.post('/pedido-aporte/confirmar/', function(req, res, next) {
	POST = req.body;
	POST.confirmado = 1;
	console.log('ATATATATATAT CONFIRMAR PEDIDO APORTE  ATATATATATAT');
	console.log(POST);
	console.log('ATTATATATATATATATATATATATATATATATATATATATATATATATA');
	model.AtualizarPedidoAporte(POST).then(data => {
		res.json(data);
	});
});

router.post('/pedido-aporte/enviar-email/', function(req, res, next) {
	POST = req.body;
	console.log('@@@@@@@@@@@@@ PEDIDO APORTE ENVIO DE EMAIL @@@@@@@@');
	console.log(POST);
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

	var html = "Olá Você está recebendo este e-mail pois pediu o comprovante por e-mail. O mesmo está em anexo."+
	"<br><b>Por-favor não responda essa mensagem, pois ela é enviada automaticamente!</b>";

	var text = "Olá Você está recebendo este e-mail pois pediu o comprovante por e-mail. O mesmo está em anexo."+
	"<br>Por-favor não responda essa mensagem, pois ela é enviada automaticamente!";

	model.GetUsuario(req.session.usuario.id).then(data_usuario =>{
		control.SendMailAttachment(data_usuario[0].email, 'Comprovante Deposito', text, html,'Comprovante',POST.informacao);
		res.json(POST.informacao);
	});
});

router.post('/pedido-rendimento/confirmar/', function(req, res, next) {
	POST = req.body;
	POST.confirmado = 1;
	console.log('PRPPRPPRPRRRPRPP CONFIRMAR PEDIDO RENDIMENTO  PRPPRPPRPRRRPRPP');
	console.log(POST);
	console.log('PRPPRPPRPRRRPRPPPRPPRPPRPRRRPRPPPRPPRPPRPRRRPRPPPRPPRPPRPRRRPR');
	model.AtualizarPedidoRendimento(POST).then(data => {
		res.json(data);
	});
});




router.post('/porcentagem-comissao/atualizar/', function(req, res, next) {
	POST = req.body;
	console.log('APCAPCAPCAPCAPCAPC ATUALIZAR PORCENTAGEM COMISSAO APCAPCAPCAPC');
	console.log(POST);
	console.log('APCAPCAPCAPCAPCAPCAPCAPCAPCAPCAPCAPCAPCAPCAPCAPCAPCAPCAPCAPCAP');
	model.AtualizarPorcentagemComissao(POST).then(data => {
		res.json(data);
	});
});

router.post('/caixa/atualizar/', function(req, res, next) {
	POST = req.body;
	console.log('ACCCCCCCCCC ATUALIZAR CAIXA ACCCCCCCCCCCCCCCCCCC');
	console.log(POST);
	console.log('ACCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');


	POST.valor = POST.valor.replace(',','.');

	if(POST.valor<0){
		POST.valor = 0;
	}

	model.AtualizarCaixa(POST).then(data => {
		res.json(data);
	});
});

router.post('/comissao/atualizar/', function(req, res, next) {
	POST = req.body;
	console.log('ACCCCCCCCCC ATUALIZAR COMISSAO ACCCCCCCCCCCCCCCCC');
	console.log(POST);
	console.log('ACCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');

	POST.valor = POST.valor.replace(',','.');

	if(POST.valor < 0){
		POST.valor = 0;
	}


	model.AtualizarComissao(POST).then(data => {
		res.json(data);
	});
});




/*Desativar*/

router.post('/noticias/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarNoticia(POST).then(data=> {
		res.json(data);
	});
});

router.post('/usuarios/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarUsuario(POST).then(data=> {
		res.json(data);
	});
});


router.post('/aviso/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarAviso(POST).then(data=> {
		res.json(data);
	});
});

router.post('/coaching/desativar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.DesativarCoaching(POST).then(data=> {
		res.json(data);
	});
});

router.post('/pedido-saque/desativar', function(req, res, next) {
	POST = req.body;
	console.log('XXXXXXXXXXX PEDIDO SAQUE DESATIVAR XXXXXXXXXXXXXXXX');
	console.log(POST);
	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
	model.DesativarPedidoSaque(POST).then(data=> {
		res.json(data);
	});
});


router.post('/pedido-aporte/desativar', function(req, res, next) {
	POST = req.body;
	console.log('XXXXXXXXXXX PEDIDO APORTE DESATIVAR XXXXXXXXXXXXXXXX');
	console.log(POST);
	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
	model.DesativarPedidoAporte(POST).then(data=> {
		res.json(data);
	});
});

router.post('/pedido-rendimento/desativar', function(req, res, next) {
	POST = req.body;
	console.log('XXXXXXXXXXX PEDIDO RENDIMENTO DESATIVAR XXXXXXXXXXXXXXXX');
	console.log(POST);
	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
	model.DesativarPedidoRendimento(POST).then(data=> {
		res.json(data);
	});
});

router.post('/caixa/desativar', function(req, res, next) {
	POST = req.body;
	console.log('XXXXXXXXXXX CAIXA DESATIVAR XXXXXXXXXXXXXXXX');
	console.log(POST);
	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
	model.DesativarCaixa(POST).then(data=> {
		res.json(data);
	});
});

router.post('/comissao/desativar', function(req, res, next) {
	POST = req.body;
	console.log('XXXXXXXXXXX COMISSAO DESATIVAR XXXXXXXXXXXXXXXX');
	console.log(POST);
	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
	model.DesativarComissao(POST).then(data=> {
		res.json(data);
	});
});



router.post('/uploadarquivo', function(req, res, next) {
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
