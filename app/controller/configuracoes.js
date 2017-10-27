// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var data = '';

// FAZER LEITURA DAS CONFIGURAÇÕES
var config = control.Config();

// CONEXÃO MYSQL
var mysql      = require('mysql');
var connection = mysql.createConnection(config['mysql']);
connection.connect();
var query = '';
var array = [];


/* GET pagina de login. */
router.get('/', function(req, res, next) {

    if (req.isAjaxRequest())
        res.send('request made through ajax.');
 
    res.send('normal http request');
});


module.exports = router;
