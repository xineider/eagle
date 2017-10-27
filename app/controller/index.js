// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var IndexModel = require('../model/indexModel.js');
var model = new IndexModel;
var app = express();
var data = '';
app.use(require('express-is-ajax-request'));

// FAZER LEITURA DAS CONFIGURAÇÕES
var config = control.Config();

// CONEXÃO MYSQL
var mysql      = require('mysql');
var connection = mysql.createConnection(config['mysql']);
connection.connect();
var query = '';
var array = [];

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.Inicio().then(data => {
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'inicio/index', data: data});
	});
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;

	// Tratar as variaveis e criar a query, caso não precise dela, deixe-a vazia
	query = 'SELECT id FROM usuarios WHERE login = ? AND senha = ?';
	array = [POST.login, POST.senha];

	// Adicione a query com scape(?) e os respectivos valores em um array simples
	control.Query(query, array).then(data => {
	  if (data.length > 0) {
			req.session.id_usuario = data[0].id;
			res.redirect('/sistema');
	  } else {
  		res.render('login/index', { erro: 'Login ou senha incorreto(s).', tipo_erro: 'login' });
	  }
	});
	
});

module.exports = router;
