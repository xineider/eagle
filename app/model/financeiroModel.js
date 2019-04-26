'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class FinanceiroModel {
	
	GetUsuario(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*\
				FROM usuarios as a WHERE deletado = ? AND id = ?', [0,id_usuario]).then(data => {
					resolve(data);
				});
			});
	}

	GetNomePlanos() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.* FROM planos as a WHERE deletado = ?', [0]).then(data => {
				resolve(data);
			});
		});
	}
	
	ConfirmarSenhaUsuario(id,senhaAtual) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE deletado = ? AND id = ? AND senha = ?', [0, id,senhaAtual]).then(data => {
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
	
	
	GetExtrato(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,DATE_FORMAT(a.data_cadastro, "%d/%m/%Y") as data_cadastro,b.nome as nome_plano,\
				CASE \
				WHEN a.tipo = 0 THEN "Depósito em Conta"\
				WHEN a.tipo = 1 THEN "Saque"\
				WHEN a.tipo = 2 THEN "Renda Mensal"\
				ELSE 0 END as mensagem \
				FROM caixa as  a \
				LEFT JOIN planos as b ON a.id_plano = b.id\
				WHERE a.deletado = ? AND a.id_usuario = ? AND a.confirmado = ? \
				ORDER BY a.data_cadastro', [0,id_usuario,1]).then(data => {
					resolve(data);
				});
			});
	}

	CadastrarPedidoSaque(POST) {	
		return new Promise(function(resolve, reject) {
			helper.Insert('caixa', POST).then(data => {
				resolve(data);
			});
		});
	}
	
	
	GetValorTotalCarteiraAplicacao(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT ( \
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END)) + \
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END)) - \
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END))\
				)as carteira_aplicacao,\
				 (SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END)) as carteira_rendimento \
				 FROM caixa', [0,0,id_usuario,1,2,0,id_usuario,1,1,0,id_usuario,1,2,0,id_usuario,1]).then(data => {
					console.log('RRRRRRRRRRRRRRR RESULTADO DA CARTEIRA TOTAL APLICACAO RRRRRRRRRRRRRRRRRRRRRRRRR');
					console.log(data);
					console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
					resolve(data);
				});
			});
		}

	GetInvestimentos(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT b.id, (\
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND confirmado = ?) THEN a.valor ELSE 0 END)) + \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND confirmado = ?) THEN a.valor ELSE 0 END)) - \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND confirmado = ?) THEN a.valor ELSE 0 END))\
				) as caixa, b.nome \
				FROM caixa as a \
				LEFT JOIN planos as b ON a.id_plano = b.id\
				GROUP BY a.id_plano ORDER BY b.id DESC', [0,0,id_usuario,1,2,0,id_usuario,1,1,0,id_usuario,1]).then(data => {
					resolve(data);
				});
			});
	}



}
module.exports = FinanceiroModel;