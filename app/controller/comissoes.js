// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var ComissoesModel = require('../model/comissoesModel.js');
var model = new ComissoesModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.GetUsuario(req.session.usuario.id).then(data_perfil=>{
		data.perfil = data_perfil;
		model.GetComissoes(req.session.usuario.id).then(data_comissoes=>{
			data.comissoes = data_comissoes;
			model.GetValorTotalCarteiraCoachees(req.session.usuario.id).then(data_aporte_total_coachee=>{
				data.valor_total_coachees = data_aporte_total_coachee;
				console.log('COMCOMCOMCOMCOMCOMCOMCOM COMISSOES COMCOMCOMCOMCOMCOMCOM');
				console.log(data);
				console.log('COMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCOMCO');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'comissoes/comissoes', data: data, usuario: req.session.usuario});
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
