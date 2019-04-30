// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var CoacheesModel = require('../model/coacheesModel.js');
var model = new CoacheesModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetTodosCoachees(req.session.usuario.id).then(data_coachees=>{
			data.coachees= data_coachees;			
			console.log('===================== DATA USUARIO ====================');
			console.log(data);
			console.log('=======================================================');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'coachees/coachees', data: data, usuario: req.session.usuario});
			
		});
	});
});



router.get('/cadastrar', function(req, res, next) {	
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'coachees/cadastrar', data: data, usuario: req.session.usuario});
});






/* POST enviando o login para verificação. */
router.post('/cadastrar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	var senha = Math.random().toString(36).substr(2, 8);
	POST.senha = senha;
	POST.id_coach = req.session.usuario.id;
	console.log('UUUUUUUUUUUUUU UUUSUARIO UUUUUUUUUUUUUUUUUUUUUUUUUU');
	console.log(POST);
	console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');
	
	model.VerificarSeTemLogin(POST.login).then(tem_login => {
		console.log('ttttttttttt tem login ttttt');
		console.log(tem_login);
		console.log('ttttttttttttttttttttttttttt');
		
		if(tem_login == ''){
			model.CadastrarCoachee(POST).then(data => {
				var to = POST.email;
				var subject = 'Bem-vindo ao Eagle Finances!';
				var html = 'Bem vindo ao Eagle Finances. Segue abaixo as informações sobre sua conta. \
				<br> <b>Login:</b>'+POST.login+'<br> \
				<br> <b>Senha:</b>'+senha+'<br>\
				Recomendamos que você altera sua senha ao acessar o seu perfil ao clicar na imagem no cabeçalho a direita.<br>\
				Acesse via o aplicativo Eagle Finance<br> \
				Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão.<br>\
				<br><b>Por-favor não responda essa mensagem, pois ela é enviada automaticamente!</b>';
				var text = 'Bem vindo ao Eagle Finances. Segue abaixo as informações sobre sua conta.\
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

module.exports = router;
