// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var InvestimentoModel = require('../model/investimentoModel.js');
var model = new InvestimentoModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	model.GetInvestimentos(req.session.usuario.id).then(data_investimentos=>{
		data.investimentos= data_investimentos;

			console.log('===================== DATA USUARIO ====================');
			console.log(data);
			console.log('=======================================================');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montadorMobile', {html: 'investimento/investimento', data: data, usuario: req.session.usuario});
	});
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	model.GetNoticias().then(data => {
		res.json(data);
	});
});

module.exports = router;
