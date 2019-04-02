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
	
	GetCoachingVistosNaoVistos(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,\
			CASE WHEN (b.id_coaching = a.id AND b.id_usuario = ? AND b.deletado = ?) THEN 1 ELSE 0 END AS visto\
			FROM `coaching` as a\
			LEFT JOIN coaching_usuario as b ON a.id = b.id_coaching', [id_usuario,0]).then(data => {
				console.log('VVVVVVVVVVVVVVVVVVV COACHING VISTO E NAO VISTO VVVVVVVVVVVVV');
				console.log(data);
				console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
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
module.exports = CoachingModel;