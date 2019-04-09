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
		model.GetNoticias().then(data_noticias=>{
			data.noticias = data_noticias
			console.log('===================== DATA USUARIO ====================');
			console.log(data);
			console.log('=======================================================');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/noticias/noticias', data: data, usuario: req.session.usuario});
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
			data.aporte_primeiro = data_primeiro_aporte;
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
			data.aporte_primeiro = data_primeiro_aporte;
			console.log('===================== DATA USUARIO ====================');
			console.log(data);
			console.log('=======================================================');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'financeiro/saque', data: data, usuario: req.session.usuario});
		});
	});
});


router.get('/coaching', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetCoachings().then(data_coaching=>{
			data.coaching = data_coaching;
			console.log('===================== DATA USUARIO ====================');
			console.log(data);
			console.log('=======================================================');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/coachings/coachings', data: data, usuario: req.session.usuario});
		});
	});
});

router.get('/avisos', function(req, res, next) {
	model.GetAvisos().then(data_avisos=>{
		data.avisos = data_avisos;
		console.log('===================== DATA USUARIO ====================');
		console.log(data);
		console.log('=======================================================');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/avisos/avisos', data: data, usuario: req.session.usuario});
	});	
});

router.get('/usuarios', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetUsuarios().then(data_usuarios=>{
			data.usuarios_admin = data_usuarios
			console.log('===================== DATA USUARIO ====================');
			console.log(data);
			console.log('=======================================================');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/usuarios/usuarios', data: data, usuario: req.session.usuario});
		});
	});
});


router.get('/pedidos-saques', function(req, res, next) {
	model.GetPedidosSaques().then(data_pedido_saque=>{
		data.pedido_saque = data_pedido_saque;
		console.log('===================== DATA USUARIO ====================');
		console.log(data);
		console.log('=======================================================');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/pedidos-saques/pedidos_saques', data: data, usuario: req.session.usuario});
	});
});

router.get('/porcentagem-comissao', function(req, res, next) {
	model.GetPorcentagemComissao().then(data_porcentagem_comissao=>{
		data.porcentagem_comissao = data_porcentagem_comissao;
		console.log('===================== DATA USUARIO ====================');
		console.log(data);
		console.log('=======================================================');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/porcentagem-comissao/porcentagem_comissao', data: data, usuario: req.session.usuario});
	});
});


router.get('/ganhos-mensais', function(req, res, next) {
	model.GetGanhosMensais().then(data_ganho_mensais=>{
		data.ganhos_mensais = data_ganho_mensais;
		console.log('===================== DATA USUARIO ====================');
		console.log(data);
		console.log('=======================================================');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/ganhos-mensais/ganhos_mensais', data: data, usuario: req.session.usuario});
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



/*Cadastrar Administração */

router.get('/noticias/criar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/noticias/cadastrar_noticia', data: data, usuario: req.session.usuario});
});

router.get('/usuarios/criar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/usuarios/cadastrar_usuario', data: data, usuario: req.session.usuario});
});

router.get('/coaching/criar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/coachings/cadastrar_coaching', data: data, usuario: req.session.usuario});
});

router.get('/avisos/criar', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/avisos/cadastrar_aviso', data: data, usuario: req.session.usuario});
});

/* Editar Administração */


router.get('/noticias/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei a noticia no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarNoticia(id).then(data => {
		console.log('SSSSSSSSSSSSSS SELEICONAR NOTICIA SSSSSSSSSSSSSSSSSSSSSSSS');
		console.log(data);	
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/noticias/editar_noticia', data: data, usuario: req.session.usuario});
	});
});



router.get('/usuarios/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('Selecionei o usuario no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarUsuario(id).then(data => {
		console.log('SSSSSSSSSSSSSS SELEICONAR NOTICIA SSSSSSSSSSSSSSSSSSSSSSSS');
		console.log(data);	
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/usuarios/editar_usuario', data: data, usuario: req.session.usuario});
	});
});

router.get('/coaching/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei a noticia no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarCoaching(id).then(data => {
		console.log('SSSSSSSSSSSSSS SELEICONAR NOTICIA SSSSSSSSSSSSSSSSSSSSSSSS');
		console.log(data);	
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/coachings/editar_coaching', data: data, usuario: req.session.usuario});
	});
});

router.get('/aviso/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei a noticia no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarAviso(id).then(data => {
		console.log('SSSSSSSSSSSSSS SELEICONAR NOTICIA SSSSSSSSSSSSSSSSSSSSSSSS');
		console.log(data);	
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/avisos/editar_aviso', data: data, usuario: req.session.usuario});
	});
});


router.get('/pedido-saque/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o pedido-saque no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarPedidoSaque(id).then(data => {
		console.log('SSSSSSSSSSSSSS SELEICONAR NOTICIA SSSSSSSSSSSSSSSSSSSSSSSS');
		console.log(data);	
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/pedidos-saques/editar_pedido_saque', data: data, usuario: req.session.usuario});
	});
});


router.get('/porcentagem-comissao/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o porcentagem-comissao no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarPorcentagemComissao(id).then(data => {
		console.log('SSSSSSSSSSSSSS SELEICONAR NOTICIA SSSSSSSSSSSSSSSSSSSSSSSS');
		console.log(data);	
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/porcentagem-comissao/editar_porcentagem_comissao', data: data, usuario: req.session.usuario});
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
	
	model.VerificarSeTemLogin(POST.login).then(tem_login => {
		console.log('ttttttttttt tem login ttttt');
		console.log(tem_login);
		console.log('ttttttttttttttttttttttttttt');
		
		if(tem_login == ''){
			model.CadastrarUsuario(POST).then(data => {
				var to = POST.email;
				var subject = 'Bem-vindo ao Eagle Finances!';
				var html = 'Bem vindo ao Ealge Finances. Segue abaixo as informações sobre sua conta. \
				<br> <b>Login:</b>'+POST.login+'<br> \
				<br> <b>Senha:</b>'+senha+'<br>\
				Recomendamos que você altere sua senha ao acessar o seu perfil ao clicar na imagem no cabeçalho a direita.<br>\
				Acesse via o aplicativo <a href="www.eagle.finance" target="_blank">Eagle Finances<br> \
				Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão.<br>\
				<br><b>Por-favor não responda essa mensagem, pois ela é enviada automaticamente!</b>';
				var text = 'Bem vindo ao Ealge Finances. Segue abaixo as informações sobre sua conta. Segue abaixo as informações sobre sua conta.\
				Login:'+POST.login+'Senha:'+senha+' Recomendamos que você altera sua senha ao acessar o seu perfil ao clicar na imagem no cabeçalho a direita.\
				Acesse via o aplicativo Eagle Finances \
				Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão.\
				Por-favor não responda essa mensagem, pois ela é enviada automaticamente!';
				control.SendMail(to, subject, html, text);
				res.json(data);
			});
		}else{
			console.log('JJJJJJJJJJJJJJJJJJJ já existe login JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ');
			res.json('possui_login');
		}
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
	model.AtualizarUsuario(POST).then(data => {
		res.json(data);
	});
});

router.post('/pedido-saque/confirmar/', function(req, res, next) {
	POST = req.body;
	POST.confirmado = 1;
	console.log('AAAAAAAAA ATUALIZAR USUARIO AAAAAAAAAAAAAA');
	console.log(POST);
	console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
	model.AtualizarPedidoSaque(POST).then(data => {
		res.json(data);
	});
});

router.post('/porcentagem-comissao/atualizar/', function(req, res, next) {
	POST = req.body;
	console.log('AAAAAAAAA ATUALIZAR USUARIO AAAAAAAAAAAAAA');
	console.log(POST);
	console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
	model.AtualizarPorcentagemComissao(POST).then(data => {
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

module.exports = router;
