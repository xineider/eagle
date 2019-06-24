// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var SimuladorModel = require('../model/simuladorModel.js');
var model = new SimuladorModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {	
	data.link_sistema = '/sistema';
	console.log('^^^^^^^^^^^^^^^^^^^^^^^^ SIMULADOR ^^^^^^^^^^^^^^^^^^^^^^');
	console.log(data);
	console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'simulador/simulador', data: data, usuario: req.session.usuario});

});

module.exports = router;
