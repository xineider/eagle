'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class CoachingModel {
	
	GetUsuario(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*\
			FROM usuarios as a WHERE deletado = ? AND id = ?', [0,id_usuario]).then(data => {
				resolve(data);
			});
		});
	}
	
	GetNomeCoach(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT nome FROM usuarios WHERE deletado = ? AND id IN \
			(SELECT id_coach FROM usuarios WHERE id=? AND deletado = ?)', [0,id_usuario,0]).then(data => {
				console.log('GGGGGGGGGGGGGGGG GETNOMECOACH GGGGGGGGGGGGGGGGGGG');
				console.log(data);
				console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG');
				resolve(data);
			});
		});
		
	}
	
	GetCoachingVistosUsuario(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,\
			CASE WHEN (b.id_coaching = a.id AND b.id_usuario = ? AND b.deletado = ?) THEN 1 ELSE 0 END AS visto\
			FROM coaching as a\
			LEFT JOIN coaching_usuario as b ON a.id = b.id_coaching \
			WHERE b.id_usuario = ?', [id_usuario,0,id_usuario]).then(data => {
				console.log('VVVVVVVVVVVVVVVVVVV COACHING VISTO E NAO VISTO VVVVVVVVVVVVV');
				console.log(data);
				console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
				resolve(data);
			});
		});
	}
	
	
	// GetCoacheesComCoaching(id_usuario){
	// 	return new Promise(function(resolve, reject) {
	// 		helper.Query('SELECT a.id, a.nome, c.titulo \
	// 		FROM usuarios as a \
	// 		LEFT JOIN coaching_usuario as b ON b.id_usuario = a.id \
	// 		LEFT JOIN coaching as c ON c.id = b.id_coaching \
	// 		WHERE a.id_coach = ? AND a.deletado = ? AND b.deletado = ? AND c.deletado = ? \
	// 		ORDER BY b.id  DESC LIMIT 1 ', [id_usuario,0,0,0]).then(data => {
	// 			resolve(data);
	// 		});
	// 	});
	// }


	GetCoacheesComCoaching(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.id, a.nome,  \
			(SELECT c.titulo FROM coaching as c WHERE c.deletado = ? AND c.id IN \
			(SELECT d.id_coaching FROM coaching_usuario as d WHERE a.id = d.id_usuario AND d.deletado = ?)\
			ORDER BY c.id DESC LIMIT 1) as titulo\
			FROM usuarios as a \
			WHERE a.id_coach = ? AND a.deletado = ?', [0,0,id_usuario,0]).then(data => {
				resolve(data);
			});
		});
	}



		


	
	GetTodosCoachees(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.* \
			FROM usuarios as a \
			WHERE a.id_coach = ? AND a.deletado = ?', [id_usuario,0]).then(data => {
				resolve(data);
			});
		});
	}

	GetTodosCoaching(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.* \
			FROM coaching as a \
			WHERE a.deletado = ?', [0]).then(data => {
				resolve(data);
			});
		});
	}
	
	
	GetTotalVistos(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT COUNT(*) as numeroVisto FROM `coaching_usuario` \
			WHERE id_usuario = ? AND deletado = ?', [id_usuario,0]).then(data => {
				console.log('VVVVVVVVVVVVVVVVVVV COACHING VISTO E NAO VISTO VVVVVVVVVVVVV');
				console.log(data);
				console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
				resolve(data);
			});
		});
	}

	CadastrarCoachingUsuario(POST) {	
		return new Promise(function(resolve, reject) {
			helper.Insert('coaching_usuario', POST).then(data => {
				resolve(data);
			});
		});
	}
	
	
	
	

	
	
	
	
	
	
	
}
module.exports = CoachingModel;