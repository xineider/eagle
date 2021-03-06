// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var CoachingModel = require('../model/coachingModel.js');
var model = new CoachingModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		data.link_sistema = '/sistema';
		console.log('EEEEEEEEEEEEEEEEEEEEE ESTATISTICAS EEEEEEEEEEEEEEEEEEEEEEE');
		console.log(data);
		console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'estatisticas/estatisticas', data: data, usuario: req.session.usuario});
	});
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	model.GetNoticias().then(data => {
		res.json(data);
	});
});

module.exports = router;
