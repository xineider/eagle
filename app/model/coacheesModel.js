'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class CoacheesModel {
	
	GetUsuario(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*\
			FROM usuarios as a WHERE deletado = ? AND id = ?', [0,id_usuario]).then(data => {
				resolve(data);
			});
		});
	}


	

	GetTodosCoachees(id_coach) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT c.nome, b.nome as plano\
			FROM `caixa` as a  LEFT JOIN usuarios as c ON a.id_usuario = c.id\
			LEFT JOIN planos as b ON a.id_plano = b.id\
			WHERE c.id_coach = ? AND a.deletado = ? \
			ORDER BY c.id DESC', [id_coach,0]).then(data => {
				console.log('000000000000 GET TODOS COACHES 000000000');
				console.log(data);
				console.log('0000000000000000000000000000000000000000');
				resolve(data);
			});
		});
	}
	

	

	
	
	CadastrarCoachee(data) {
		return new Promise(function(resolve, reject) {
			data.senha = helper.Encrypt(data.senha);
			console.log('************************* DATA CadastrarUsuario ***************************');
			console.log(data);
			console.log('***************************************************************************');
			helper.Insert('usuarios', data).then(data => {				
				resolve(data);
			});
		});
	}

	VerificarSeTemLogin(login){
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query("SELECT login \
				FROM usuarios WHERE deletado = ? AND login = ?", [0,login]).then(data => {
					resolve(data);
				});
			});
	}
	
	
	
	
	
}
module.exports = CoacheesModel;