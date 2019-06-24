// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var SuporteModel = require('../model/suporteModel.js');
var model = new SuporteModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	data.link_sistema = '/sistema';
	console.log('´´´´´´´´´´´´´´´´´´´´´´´´´´ SUPORTE ´´´´´´´´´´´´´´´´');
	console.log(data);
	console.log('´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´');
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'suporte/suporte', data: data, usuario: req.session.usuario});
});




module.exports = router;
