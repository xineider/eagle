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
		model.GetNomeCoach(req.session.usuario.id).then(data_nome_coach=>{
			data.nome_coach= data_nome_coach;
			model.GetCoachingVistosNaoVistos(req.session.usuario.id).then(data_coaching=>{
				data.coaching = data_coaching
				model.GetTotalVistos(req.session.usuario.id).then(data_total_visto=>{
					data.total_visto = data_total_visto
					console.log('===================== DATA USUARIO ====================');
					console.log(data);
					console.log('=======================================================');
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'coaching/coaching', data: data, usuario: req.session.usuario});
				});
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
