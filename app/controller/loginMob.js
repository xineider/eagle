// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var LoginModel = require('../model/loginModel.js');
var model = new LoginModel;
var data = '';
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	if (typeof req.session.id_usuario != 'undefined' && req.session.id_usuario != 0) {
		res.redirect('/sistema');
	} else {
		res.render('login/index', {});
	}
});

router.get('/loginagain', function(req, res, next) {
	console.log('LLLLLLLLLLLLLLLLLLLLLLLL LOGIN AGAIN LLLLLLLLLLLLLLLLLLLLLLLLLLLL');
	console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
	req.session.destroy(function(err) {
		console.log('SSSSSSSSS SESSÃO DESTRUIDA ERR SSSSSSSSSSSSSSSSSSSS');
		console.log(err);
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
	});
	res.render('login/login_app', {});
	// res.render(req.isAjaxRequest() == true ? 'api' : 'montadorLimpo', {html: 'login/login_again', data: data, usuario: req.session.usuario});
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.senha = control.Encrypt(POST.senha);
	model.Login(POST).then(data => {
		if (data.length > 0) {
			model.VerificarDeletado(data[0].id).then(dataDeletado => {
				if(dataDeletado == ''){
					req.session.usuario = {};
					req.session.usuario.id = data[0].id;
					req.session.usuario.hash_login = data[0].hash_login;
					req.session.usuario.nivel = data[0].nivel;
					req.session.usuario.imagem = data[0].imagem;
					res.redirect('/mobsmart');
				}else{
					res.render('login/index', { erro: 'Usuário banido do aplicativo pela Administração', tipo_erro: 'login', usuario: req.session.usuario });
				}
			});
		}else {
			res.render('login/index', { erro: 'Login ou senha incorreto(s).', tipo_erro: 'login', usuario: req.session.usuario });
		}
	});
});

/* GET pagina de login. */
router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
		console.log(err);
	});
	res.render('login/index', {});
});

module.exports = router;
