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
		console.log('------------- DATA NOTICIAS ------------------');
		console.log(data);
		console.log('----------------------------------------------');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'inicio/index', data: data, usuario: req.session.usuario});
	});
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	model.GetNoticias().then(data => {
		res.json(data);
	});
});

module.exports = router;
