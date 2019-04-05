'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class IndexModel {
	
	GetNoticias() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM noticias WHERE deletado = ? AND club = ? \
			ORDER BY data_cadastro LIMIT 6', [0,0]).then(data => {
				resolve(data);
			});
		});
	}
	
	
	GetValorTotalCarteiraAplicacao(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT ( \
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ?) THEN valor ELSE 0 END)) - \
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ?) THEN valor ELSE 0 END))\
				)as carteira_aplicacao FROM caixa', [0,0,id_usuario,1,0,id_usuario]).then(data => {
					console.log('RRRRRRRRRRRRRRR RESULTADO DA CARTEIRA TOTAL APLICACAO RRRRRRRRRRRRRRRRRRRRRRRRR');
					console.log(data);
					console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
					resolve(data);
				});
			});
		}
		
	}
	module.exports = IndexModel;