// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var UsuariosModel = require('../model/usuariosModel.js');
var model = new UsuariosModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

// ESPECIFICO
const fileUpload = require('express-fileupload');
var nodemailer = require('nodemailer');
router.use(fileUpload());

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.SelecionarUsuarios().then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/index', data: data, usuario: req.session.usuario});
	});
});
router.get('/criar', function(req, res, next) {
	model.SelecionarSetores().then(data_setores => {
		data['setores'] = data_setores;
		console.log(data);
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_criar', data: data, usuario: req.session.usuario});
	});
});
router.get('/editar/:id', function(req, res, next) {
	model.SelecionarSetores().then(data_setores => {
		data['setores'] = data_setores;
		model.SelecionarUsuario(req.params.id).then(data_usuario => {
			data['usuario'] = data_usuario;
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_editar', data: data, usuario: req.session.usuario});
		});
	});
});
router.get('/editar/perfil/:id', function(req, res, next) {
	model.SelecionarUsuario(req.params.id).then(data_usuario => {
		data['usuario'] = data_usuario;
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_perfil_editar', data: data, usuario: req.session.usuario});
	});
});

// POSTS
	router.post('/cadastrar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		POST.senha = control.Encrypt('optima');
		model.CadastrarUsuario(POST).then(data => {
			nodemailer.createTestAccount((err, account) => {

					// create reusable transporter object using the default SMTP transport
					let transporter = nodemailer.createTransport({
							host: 'smtp.ethereal.email',
							port: 587,
							secure: false, // true for 465, false for other ports
							auth: {
									user: 'jgrhm5kdxr5z3lkt@ethereal.email', // generated ethereal user
									pass: 'XCEPzh1YBtDC8JkdZb'  // generated ethereal password
							}
					});

					// setup email data with unicode symbols
					let mailOptions = {
							from: 'jgrhm5kdxr5z3lkt@ethereal.email', // sender address
							to: 'leonardopeixe42@gmail.com', // list of receivers
							subject: 'Você foi registrado com sucesso em Optima - QUORP', // Subject line
							text: 'Bem vindo ao sistema de tarefas Optima. Seu login é: leopeixe42 e sua senha é rr43233. Acesse via o link "bla"', // plain text body
							html: 'Bem vindo ao sistema de tarefas Optima. Segue abaixo as informações sobre sua conta. \
										<br> <b>Login: leopeixe42</b> <br> \
							 			<br> <b>Senha: rr43233</b> <br>Acesse via o link "bla"' // html body
					};

					// send mail with defined transport object
					transporter.sendMail(mailOptions, (error, info) => {
							if (error) {
									return console.log(error);
							}
							console.log('Message sent: %s', info.messageId);
							res.json(data);

							// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
							// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
					});
			});
		});
	});

	router.post('/atualizar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.AtualizarUsuario(POST).then(data => {
			res.json(data);
		});
	});

	router.post('/desativar', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
  	model.DesativarUsuario(POST).then(data=> {
  		res.json(data);
  	});
	});

	router.post('/ver/perfil/', function(req, res, next) {
		// Recebendo o valor do post
		POST = req.body;
		model.LoadPerfil(POST.id).then(data => {
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'usuarios/usuarios_perfil_header', data: data});
		});
	});
	
	router.post('/uploadarquivo', function(req, res, next) {
	  var sampleFile = req.files.arquivo;
	  var nome = control.DateTimeForFile()+'_'+sampleFile.name;
		var id = req.session.id_usuario;

	 	model.CadastraArquivo(id, nome).then(data => {
		  // Use the mv() method to place the file somewhere on your server
		  sampleFile.mv('./assets/uploads/'+nome, function(err) {
		    if (err) {
		      return res.status(500).send(err);
		    }

				res.json(nome);
		  });
	 	});
	});

module.exports = router;
