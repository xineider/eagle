'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

// FAZER LEITURA DAS CONFIGURAÇÕES
var config = helper.Config();

// CONEXÃO MYSQL
var mysql      = require('mysql');
var connection = mysql.createConnection(config['mysql']);
connection.connect();
var query = '';
var array = [];

class IndexModel {
	Inicio() {
		// Para retornar quando chamar a função
		return new Promise(function(resolve, reject) {
			var bla = [];
			// Tratar as variaveis e criar a query, caso não precise dela, deixe-a vazia
			query = 'SELECT * FROM usuarios';
			array = [];
			
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			connection.query(query, array, function (error, results, fields) {
				bla = results;
				resolve(results);
			});
		});
	}
}
module.exports = IndexModel;