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
	if(req.session.usuario.nivel == 0){	
		model.GetNomeCoach(req.session.usuario.id).then(data_nome_coach=>{
			data.nome_coach= data_nome_coach;
			model.GetTodosCoaching().then(data_coaching=>{
				data.coaching = data_coaching;
				model.GetCoachingVistosUsuario(req.session.usuario.id).then(data_coaching_vistos=>{
					data.coaching_vistos = data_coaching_vistos;
					model.GetTotalVistos(req.session.usuario.id).then(data_total_visto=>{
						data.total_visto = data_total_visto;
						data.link_sistema = '/sistema';
						console.log('===================== DATA COACHING COACHEE ====================');
						console.log(data);
						console.log('=======================================================');
						res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'coaching/coaching', data: data, usuario: req.session.usuario});
					});
				});
			});
		});
	}else if(req.session.usuario.nivel == 1 || req.session.usuario.nivel == 2){
		model.GetCoacheesComCoaching(req.session.usuario.id).then(data_coachees_coaching=>{
			data.coachees_coaching = data_coachees_coaching;
			model.GetTodosCoaching().then(data_coaching=>{
				data.coaching = data_coaching;
				data.link_sistema = '/sistema';	
				
				console.log('........................ DATA COACHING COACH .........................');
				console.log(data);
				console.log('......................................................................');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'coaching/coaching_coach', data: data, usuario: req.session.usuario});
			});
		});
	}
});


router.get('/confirmar_coaching', function(req, res, next) {
	model.GetTodosCoachees(req.session.usuario.id).then(data_todos_coachees=>{
		data.coachee = data_todos_coachees;
		model.GetTodosCoaching().then(data_coaching=>{
			data.coaching = data_coaching;
			data.link_sistema = '/sistema';
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'coaching/confirmar_coaching', data: data, usuario: req.session.usuario});
		});
	});
});


/* POST enviando o login para verificação. */
router.post('/confirmar_usuario/', function(req, res, next) {
	POST = req.body;
	console.log('CCCCCCCCCCCCCCCCCCCCCCCCC CONFIRMAR USUARIO CCCCCCCCCCCCCCCCCCCC');
	console.log(POST);
	console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
	model.CadastrarCoachingUsuario(POST).then(data => {
		res.json(data);
	});
});
module.exports = router;
