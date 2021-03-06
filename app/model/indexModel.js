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

	GetAvisos(nivel) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *,DATE_FORMAT(data_cadastro, "%d/%m/%Y") as data_cadastro_formatado FROM avisos WHERE deletado = ? AND (id_nivel = ? OR id_nivel = ?) ORDER BY data_cadastro DESC LIMIT 3', [0,99,nivel]).then(data => {
				resolve(data);
			});
		});
	}

	SelecionarTodasNoticias() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM noticias WHERE deletado = ? AND club = ? \
				ORDER BY data_cadastro', [0,0]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarTodosAvisos(nivel) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *,DATE_FORMAT(data_cadastro, "%d/%m/%Y") as data_cadastro_formatado FROM avisos WHERE deletado = ? AND (id_nivel = ? OR id_nivel = ?) ORDER BY data_cadastro DESC', [0,99,nivel]).then(data => {
				resolve(data);
			});
		});
	}
	
	SelecionarNoticia(id) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT * FROM noticias WHERE id = ? AND deletado = ?", [id,0]).then(data => {
				resolve(data);
			});
		});
	}
	
	
	GetValorTotalCarteiraAplicacao(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT REPLACE(ROUND(( \
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END)) + \
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END)) - \
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END)) - \
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END))\
				),2),".",",")as carteira_aplicacao,\
				REPLACE(ROUND((\
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END)) - \
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END))\
				),2),".",",") as carteira_rendimento \
				FROM caixa', [0,0,id_usuario,1,2,0,id_usuario,1,1,0,id_usuario,1,3,0,id_usuario,1,2,0,id_usuario,1,3,0,id_usuario,1]).then(data => {
					console.log('RRRRRRRRRRRRRRR RESULTADO DA CARTEIRA TOTAL APLICACAO RRRRRRRRRRRRRRRRRRRRRRRRR');
					console.log(data);
					console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
					resolve(data);
				});
			});
	}

	VerificarConfirmacaoContrato(id){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT id FROM usuarios WHERE id = ? AND deletado = ? AND confirmou_contrato = ?', [id,0,0]).then(data => {
				resolve(data);
			});
		});
	}

	CadastrarLog(POST) {
		var cadastrarLog = [];
		cadastrarLog.ip = POST[0];
		cadastrarLog.method = POST[1];
		cadastrarLog.rota = POST[2];
		cadastrarLog.user_agent = POST[3];
		cadastrarLog.id_usuario = POST[4];

		return new Promise(function(resolve, reject) {
			helper.Insert('log', cadastrarLog).then(data => {
				resolve(data);
			});
		});
	}

	AceitoContrato(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('usuarios', data_insert).then(data => {
				resolve(data);
			});
		});
	}
	
	
	
}

module.exports = IndexModel;