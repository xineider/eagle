// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var apiModel = require('../model/apiModel.js');
var model = new apiModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	res.json(0);
});


router.post('/entrar_sistema', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.senha = control.Encrypt(POST.senha);

	model.Login(POST).then(data => {
		if(data.length > 0){
			model.VerificarDeletado(data[0].id).then(dataDeletado => {
				if(dataDeletado == ''){
					req.session.usuario = {};
					req.session.usuario.id = data[0].id;
					req.session.usuario.hash_login = data[0].hash_login;
					req.session.usuario.nivel = data[0].nivel;
					res.send({result: 'redirect', url:'/sistema'});

					/*Usuário deletado*/
				}else{
					res.send({result: 'banido', mensagem:'Usuário banido do aplicativo pela Administração',erro:'warn'});
							// res.render('login/index', { erro: 'Usuário banido do aplicativo pela Administração', tipo_erro: 'login', usuario: req.session.usuario });
						}
					});

		}else{
			/*Não existe login ou senha no banco*/
			res.send({result: 'loginerrado', mensagem:'Login ou senha incorreto(s).',erro:'warn'});
		};
	});
});


router.post('/recuperar/senha', function(req, res, next) {
	var post = req.body;
	var data_insert;
	var nova_senha;
	model.PesquisarEmail(post.email).then(idEmail => {
		if(idEmail != ''){
			nova_senha = Math.random().toString(36).substring(7);
			data_insert = {id: idEmail[0].id, senha: nova_senha};
			model.AlterarSenhaUsuarioPorId(data_insert).then(data_alterado_sucesso =>{
				var html = "Olá, você está recebendo este e-mail pois pediu para recuperar sua senha"+
				"<br>Sua nova senha na Eagle é: "+nova_senha+
				"<br>Caso não pediu para recuperar a sua senha entre em contato com o Suporte pelo e-mail <a href='mailto:suporte@eagle.finance.com.br'>suporte@eagle.finance.com.br</a>"+
				'<br><br>Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
				'<br>Não responda esta mensagem, ela é enviada automaticamente.';
				var text = "Olá, você está recebendo este e-mail pois pediu para recuperar sua senha"+
				"<br>Sua nova senha na Eagle é: "+nova_senha+
				"<br>Caso não pediu para recuperar a sua senha entre em contato com o Suporte pelo e-mail <a href='mailto:suporte@eagle.finance.com.br'>suporte@eagle.finance.com.br</a>"+
				'<br><br>Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
				'<br>Não responda esta mensagem, ela é enviada automaticamente.';
				control.SendMail(post.email, 'Recuperação de Senha - Eagle Finance', html, text);				
				res.json(data_alterado_sucesso);
			});

		}else{
			res.json(['email_nao_cadastrado']);
		}
	});
});

router.get('/loginagain', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'login/login_again', data: data, usuario: req.session.usuario});
});


module.exports = router;
