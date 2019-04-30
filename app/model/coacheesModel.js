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
			helper.Query('SELECT a.nome ,a.id, \
				CASE  \
				WHEN (SELECT valor FROM caixa as b WHERE b.id_usuario = a.id AND b.deletado = ? AND b.tipo = ? AND b.confirmado = ? LIMIT 1) THEN "Aplicação Ativa" \
				WHEN (SELECT id_coaching FROM coaching_usuario as c WHERE c.id_usuario = a.id AND c.deletado = ? LIMIT 1) THEN "Coaching em Andamento" \
				WHEN (SELECT id_usuario FROM agenda as d WHERE d.id_coachee = a.id AND d.deletado = ? LIMIT 1) THEN "Agendado Coaching"  \
				ELSE "Coaching não iniciado" END as status\
				FROM usuarios as a  \
				WHERE a.id_coach = ? AND a.deletado = ?\
				ORDER BY a.id DESC', [0,0,1,0,0,id_coach,0]).then(data => {
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