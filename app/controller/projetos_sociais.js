// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var Projetos_SociaisModel = require('../model/projetos_SociaisModel.js');
var model = new Projetos_SociaisModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	data.link_sistema = '/sistema';
	console.log('```````````````````` PROJETOS SOCIAIS ````````````````');
	console.log(data);
	console.log('``````````````````````````````````````````````````````');
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'projetos_sociais/projetos_sociais', data: data, usuario: req.session.usuario});
});



module.exports = router;
