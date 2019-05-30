'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class ComissoesModel {

	GetUsuario(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*\
				FROM usuarios as a WHERE deletado = ? AND id = ?', [0,id_usuario]).then(data => {
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




	GetComissoes(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *, REPLACE(valor,".",",") as valor,DATE_FORMAT(data_cadastro, "%d/%m/%Y") as data_cadastro FROM comissao WHERE deletado = ? AND id_usuario = ? ', [0,id_usuario]).then(data => {
				resolve(data);
			});
		});
	}

	GetValorTotalCarteiraCoachees(id_usuario){

		return new Promise(function(resolve, reject) {
			helper.Query('SELECT REPLACE(( \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.confirmado = ?)  THEN a.valor ELSE 0 END)) + \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.confirmado = ?) THEN a.valor ELSE 0 END)) - \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.confirmado = ?) THEN a.valor ELSE 0 END))\
				),".",",")as total_todos_coachees\
				FROM caixa as a \
				LEFT JOIN usuarios as b ON a.id_usuario = b.id\
				WHERE b.id_coach = ? AND b.deletado = ?', [0,0,1,2,0,1,1,0,1,id_usuario,0]).then(data => {
					resolve(data);
				});
			});




	}









}
module.exports = ComissoesModel;