'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class CursosModel {

	GetUsuario(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,\
			 (SELECT nome FROM planos as b WHERE b.id = a.id_plano) as plano\
			  FROM usuarios as a WHERE deletado = ? AND id = ?', [0,id_usuario]).then(data => {
				resolve(data);
			});
		});
	}


	GetAporte(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT SUM(valor) as aporte_total\
			  FROM caixa WHERE deletado = ? AND id_usuario = ? AND tipo= ?', [0,id_usuario,0]).then(data => {
				resolve(data);
			});
		});
	}

	GetPrimeiroAporte(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT DATE_FORMAT(data_cadastro, "%d/%m/%Y") as data_cadastro FROM caixa WHERE deletado = ? AND id_usuario = ? AND tipo= ? ORDER BY data_cadastro ASC LIMIT 1', [0,id_usuario,0]).then(data => {
				resolve(data);
			});
		});
	}




	GetNoticias() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM noticias ORDER BY data_cadastro', []).then(data => {
				resolve(data);
			});
		});
	}







}
module.exports = CursosModel;