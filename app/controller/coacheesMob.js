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
			data.link_cadastrar = '/mobsmart/coachees/cadastrar';	
			console.log('COCCOCCOCCOCCOCCOCCOC COACHEES COCCOCCOCCOCCOC');
			console.log(data);
			console.log('COCCOCCOCCOCCOCCOCCOCCOCCOCCOCCOCCOCCOCCOCCOCC');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'coachees/coachees', data: data, usuario: req.session.usuario});
			
		});
	});
});



router.get('/cadastrar', function(req, res, next) {	
	data.link_back = '/mobsmart/coachees/';
	res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'coachees/cadastrar', data: data, usuario: req.session.usuario});
});



router.post('/cadastrar', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	var senha = Math.random().toString(36).substr(2, 8);
	POST.senha = senha;
	POST.id_coach = req.session.usuario.id;
	console.log('C_AC_AC_AC_AC_AC_AC_AC_A CADASTRAR COACHEES C_AC_AC_AC_AC_AC_A');
	console.log(data);
	console.log('C_AC_AC_AC_AC_AC_AC_AC_AC_AC_AC_AC_AC_AC_AC_AC_AC_AC_AC_AC_AC_A');
	
	model.VerificarSeTemLogin(POST.login).then(tem_login => {
		console.log('ttttttttttt tem login ttttt');
		console.log(tem_login);
		console.log('ttttttttttttttttttttttttttt');
		
		if(tem_login == ''){
			model.VerificarSeTemEmail(POST.email).then(tem_email => {
				console.log('eeeeeeeeeeeeeeeeeee tem email eeeeeeeeeeeeeeeeee');
				console.log(tem_email);
				console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
				if(tem_email == ''){
					model.CadastrarCoachee(POST).then(data => {
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


						control.SendMail(POST.email, 'Bem-vindo ao Eagle Finances!', html, text);
						res.json(data);
					});
				}else{
					res.json({error:'possui_email',element:'input[name="email"]',texto:'Email já cadastrado, por-favor inserir outro!'});
				}
			});
		}else{
			res.json({error:'possui_login',element:'input[name="login"]',texto:'Login existente, tente outro!'});
		}
	});
});

module.exports = router;
