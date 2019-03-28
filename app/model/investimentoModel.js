'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class PlanoModel {
	
	GetUsuario(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*\
			FROM usuarios as a WHERE deletado = ? AND id = ?', [0,id_usuario]).then(data => {
				resolve(data);
			});
		});
	}
	
	
	GetInvestimentos(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT (\
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ?) THEN a.valor ELSE 0 END)) - \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ?) THEN a.valor ELSE 0 END))\
				) as caixa, b.nome \
				FROM caixa as a \
				LEFT JOIN planos as b ON a.id_plano = b.id\
				GROUP BY a.id_plano ORDER BY b.id DESC', [0,0,id_usuario,1,0,id_usuario]).then(data => {
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
		
		
		
	}
	module.exports = PlanoModel;