// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var CursosModel = require('../model/cursosModel.js');
var model = new CursosModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetAporte(req.session.usuario.id).then(data_aporte_todal=>{
			data.aporte_total= data_aporte_todal;
			model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
				data.aporte_primeiro = data_primeiro_aporte;
				data.link_sistema = '/sistema';
				console.log('CURCURCURCURCURCUR CURSOS CURCURCURCURCURCUR');
				console.log(data);
				console.log('CURCURCURCURCURCURCURCURCURCURCURCURCURCURCU');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'cursos/cursos', data: data, usuario: req.session.usuario});
			});
		});
	});
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	model.GetNoticias().then(data => {
		res.json(data);
	});
});

module.exports = router;
