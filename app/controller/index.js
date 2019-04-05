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
	model.GetNoticias().then(data_noticias=>{
		data.noticias = data_noticias;
		model.GetValorTotalCarteiraAplicacao(req.session.usuario.id).then(data_valor_carteira =>{
			data.carteira_aplicacao = data_valor_carteira;;			
			console.log('------------- DATA NOTICIAS INICIO------------------');
			console.log(data);
			console.log('----------------------------------------------');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'inicio/index', data: data, usuario: req.session.usuario});
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
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'inicio/ver_noticia', data: data, usuario: req.session.usuario});
	});
});

router.get('/todas_noticias', function(req, res, next) {

	model.SelecionarTodasNoticias().then(data_noticias => {
		data.noticias = data_noticias;
		console.log('SSSSSSSSSSSSSS SELEICONAR NOTICIA SSSSSSSSSSSSSSSSSSSSSSSS');
		console.log(data);	
		console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'inicio/todas_noticias', data: data, usuario: req.session.usuario});
	});
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	model.GetNoticias().then(data => {
		res.json(data);
	});
});

module.exports = router;
