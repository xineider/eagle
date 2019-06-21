// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var PerfilModel = require('../model/perfilModel.js');
var model = new PerfilModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

router.get('/', function(req, res, next) {
	model.GetPerfil(req.session.usuario.id).then(data => {
		data.link_sistema = '/mobsmart';
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'perfil/perfil', data: data, usuario: req.session.usuario});
	});
});


router.get('/alterar-senha/', function(req, res, next) {
	data.link_sistema = '/mobsmart';
	res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'perfil/alterar_senha', data: data, usuario: req.session.usuario});
});

router.get('/crop_imagem_perfil/', function(req, res, next) {
	console.log('cai aqui no alterar imagem perfil');
	model.GetPerfil(req.session.usuario.id).then(data_conf => {
		data.imagem = data_conf[0].imagem;
		data.id = data_conf[0].id;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'perfil/modal_imagem_perfil', data: data, usuario: req.session.usuario});
	});	
});



router.post('/atualizar/', function(req, res, next) {
	var POST = req.body;
	model.AtualizarUsuario(POST).then(data => {
		res.json(data);
	});
});


router.post('/alterar-senha', function(req, res, next) {
	POST = req.body;
	POST.senha = control.Encrypt(POST.senha);
	POST.id = req.session.usuario.id;
	POST.senha_atual = control.Encrypt(POST.senha_atual);
	console.log('PPPPPPPPPPPPPPPPP POST ALTERAR SENHA PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
	console.log(POST);
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
	model.GetUsuarioAlterarSenha(req.session.usuario.id,POST.senha_atual).then(data_usuario => {
		console.log('************* DADOS USUARIO *************');
		console.log(data_usuario);
		console.log('*****************************************');
		delete POST.senha_atual;
		if (data_usuario.length > 0){
			model.AtualizarUsuario(POST).then(data => {
				control.SendMail(data_usuario[0].email,'Sua senha foi Atualizada em Eagle Finances',
				'Olá sua senha foi alterada com sucesso no Eagle Finances.',
				'Olá Sua senha foi alterada com sucesso no Eagle Finances. Segue abaixo as informações sobre sua conta.'+
				'<br><b>Login</b>:'+data_usuario[0].login+ 
				'<br>Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
				'<br>Não responda esta mensagem, ela é enviada automaticamente.');
				res.json(POST.id);
			});	
		} else {
			res.json({error:'senha_atual_errada',element:'#senha_atual',texto:'Senha Atual Diferente!'});
		}
		
	});
});

router.post('/cropImagemPerfil/', function(req, res, next) {
	
	var sampleFile = req.files.arquivo;
	var nome = control.DateTimeForFile()+'_imagem_perfil.png';
	
	console.log('UUUUUUUUUUUUUUUUUUUUUU sampleFile UUUUUUUUUUUUUUUUUUUUUUUU');
	console.log(sampleFile);
	console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');
	
	sampleFile.mv('./assets/imagem_perfil/'+nome, function(err) {
		if (err) {
			return res.status(500).send(err);
		}
	});
	
	var nomeImagemPerfil = '/assets/imagem_perfil/' + nome;
	
	data_insert = {id:req.session.usuario.id,imagem:nomeImagemPerfil};
	console.log('------------ DATA INSERT ------------');
	console.log(data_insert);
	console.log('-------------------------------------');
	
	model.AtualizarUsuario(data_insert).then(data_atualizado => {
		req.session.usuario.imagem = nomeImagemPerfil;
		model.GetPerfil(req.session.usuario.id).then(data => {
			
			// res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'ward/configuracoes/configuracoes', data: data, usuario: req.session.usuario});
			res.json(data_atualizado);
		});
	});
});


router.post('/uploadimagem', function(req, res, next) {
	var arquivo = req.files.arquivo;
	var nomeImagem = control.DateTimeForFile()+'_'+arquivo.name;
	
	console.log('@@@@@@@@@@@@@@@ arquivo @@@@@@@@@@@@@@@@@@@@@@@@@@@');
	console.log(arquivo);
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	
	// Use the mv() method to place the file somewhere on your server
	arquivo.mv('./assets/imagem_perfil/'+nomeImagem, function(err) {
		if (err) {
			return res.status(500).send(err);
		}

		res.json(nomeImagem);
	});
	
});





module.exports = router;
