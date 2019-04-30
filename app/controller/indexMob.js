// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var IndexModel = require('../model/indexModel.js');
var model = new IndexModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.GetAvisos(req.session.usuario.nivel).then(data_avisos => {
		data.avisos = data_avisos;		
		model.GetNoticias().then(data_noticias=>{
			data.noticias = data_noticias;
			model.GetValorTotalCarteiraAplicacao(req.session.usuario.id).then(data_valor_carteira =>{
				data.carteira_aplicacao = data_valor_carteira;;			
				console.log('IIIIIIIIIIIIIIIIIIIIIII INDEX MOB IIIIIIIIIIIIIIIIIIIIIIIII');
				console.log(data);
				console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'inicio/index', data: data, usuario: req.session.usuario});
			});
		});
	});
});


router.get('/ver_noticia/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei a noticia no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarNoticia(id).then(data => {
		console.log('SSSSSSSSSSSSSS SELEICONAR NOTICIA SSSSSSSSSSSSSSSSSSSSSSSS');
		console.log(data);	
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'inicio/ver_noticia', data: data, usuario: req.session.usuario});
	});
});

router.get('/todas_noticias', function(req, res, next) {
	
	model.SelecionarTodasNoticias().then(data_noticias => {
		data.noticias = data_noticias;
		console.log('SSSSSSSSSSSSSS SELEICONAR NOTICIA SSSSSSSSSSSSSSSSSSSSSSSS');
		console.log(data);	
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'inicio/todas_noticias', data: data, usuario: req.session.usuario});
	});
});

router.get('/todos_avisos', function(req, res, next) {
	
	model.SelecionarTodosAvisos(req.session.usuario.nivel).then(data_avisos => {
		data.avisos = data_avisos;
		console.log('SSSSSSSSSSSSSS SELEICONAR NOTICIA SSSSSSSSSSSSSSSSSSSSSSSS');
		console.log(data);	
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'inicio/todos_avisos', data: data, usuario: req.session.usuario});
	});
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	model.Login(POST).then(data => {
		if (data.length > 0) {
			req.session.id_usuario = data[0].id;
			res.redirect('/sistema');
		} else {
			res.render('login/index', { erro: 'Login ou senha incorreto(s).', tipo_erro: 'login' });
		}
	});
	
});

module.exports = router;
