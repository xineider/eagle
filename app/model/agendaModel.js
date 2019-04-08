'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class AgendaModel {

	GetUsuario(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.* \
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


	SelecionarAgenda(id) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*,\
				DATE_FORMAT(a.data_inicial,'%d/%m/%Y') as data_inicial,\
				DATE_FORMAT(a.data_inicial,'%H:%i') as hora_inicial, \
				DATE_FORMAT(a.data_final,'%H:%i') as hora_final,\
				DATE_FORMAT(a.data_final,'%d/%m/%Y') as data_final\
				FROM agenda as a WHERE a.id = ? AND a.deletado = ?", [id, 0]).then(data => {
					console.log('############# Dados do SelecionarEvento(id) ###################');
					console.log(data);
					console.log('###############################################################');
					resolve(data);
				});
			});
	}


	// SelecionarEventos(id_usuario){
	// 	return new Promise(function(resolve, reject) {
	// 		helper.Query("SELECT a.id, \
	// 			CASE \
	// 			WHEN a.tipo = 0 THEN 'Coachee'\
	// 			WHEN a.tipo = 1 THEN 'Outro'\
	// 			ELSE a.observacoes\
	// 			END as title,\
	// 			CONVERT_TZ(a.data_inicial,'+00:00',@@global.time_zone) as start,\
	// 			CONVERT_TZ(a.data_final,'+00:00',@@global.time_zone) as end\
	// 			FROM agenda as a WHERE a.deletado = ? AND id_usuario = ? ", [0,id_usuario]).then(data => {
	// 				console.log('@@@@@@@@@@@@@ Dados Eventos do Model @@@@@@@@@@@@@');
	// 				console.log(data);
	// 				console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
	// 				resolve(data);
	// 			});
	// 		});
	// }

	SelecionarEventos(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.id, \
				CASE \
				WHEN a.tipo = 0 THEN (CONCAT('Coaching - ',(SELECT nome FROM usuarios as b WHERE a.id_coachee = b.id)))\
				WHEN a.tipo = 1 THEN 'Outro'\
				ELSE a.observacoes\
				END as title,\
				DATE_FORMAT(a.data_inicial,'%Y-%m-%d %H:%i:%s') as start, \
				DATE_FORMAT(a.data_final,'%Y-%m-%d %H:%i:%s') as end \
				FROM agenda as a WHERE a.deletado = ? AND id_usuario = ? ", [0,id_usuario]).then(data => {
					console.log('@@@@@@@@@@@@@ Dados Eventos do Model @@@@@@@@@@@@@');
					console.log(data);
					console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
					resolve(data);
				});
			});
	}

	CadastrarEvento(POST) {
		POST = helper.PrepareDates(POST, ['data_inicial']);
		POST = helper.PrepareDates(POST, ['data_final']);


		POST.data_inicial = POST.data_inicial +' '+ POST.hora_inicial + ':00';
		POST.data_final = POST.data_final +' '+ POST.hora_final + ':00';
		delete POST.hora_inicial;
		delete POST.hora_final;

		console.log('************** POST FINAL ********************');
		console.log(POST);
		console.log('**********************************************');

		return new Promise(function(resolve, reject) {
			helper.Insert('agenda', POST).then(data => {
				// helper.Insert('compromissos',"SET @@time_zone = '-3:00';").then(dataTime =>{
					resolve(data);
				// });
			});
		});
	}

	AtualizarEvento(POST) {
		POST = helper.PrepareDates(POST, ['data_inicial']);
		POST = helper.PrepareDates(POST, ['data_final']);


		POST.data_inicial = POST.data_inicial +' '+ POST.hora_inicial + ':00';
		POST.data_final = POST.data_final +' '+ POST.hora_final + ':00';
		delete POST.hora_inicial;
		delete POST.hora_final;

		console.log('************** POST FINAL ********************');
		console.log(POST);
		console.log('**********************************************');

		return new Promise(function(resolve, reject) {
			helper.Update('agenda', POST).then(data => {
				// helper.Insert('compromissos',"SET @@time_zone = '-3:00';").then(dataTime =>{
					resolve(data);
				// });
			});
		});
	}


	GetCoachees(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*\
			  FROM usuarios as a WHERE a.deletado = ? AND a.id_coach = ?', [0,id_usuario]).then(data => {
				resolve(data);
			});
		});
	}




	DesativarEvento(POST) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('agenda', POST).then(data => {
				resolve(data);
			});
		});
	}




}
module.exports = AgendaModel;