'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class AdministracaoModel {
	
	GetUsuario(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.* \
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
	
	
	SelecionarNoticia(id) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT * FROM noticias WHERE id = ? AND deletado = ?", [id,0]).then(data => {
				resolve(data);
			});
		});
	}

		
	SelecionarUsuario(id) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT * FROM usuarios WHERE id = ? AND deletado = ?", [id,0]).then(data => {
				resolve(data);
			});
		});
	}

	SelecionarCoaching(id) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT * FROM coaching WHERE id = ? AND deletado = ?", [id,0]).then(data => {
				resolve(data);
			});
		});
	}


	VerificarSeTemLogin(login){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT login \
				FROM usuarios WHERE deletado = ? AND login = ?", [0,login]).then(data => {
					resolve(data);
				});
			});
	}
	
	
	
	GetNoticias() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *,DATE_FORMAT(data_cadastro, "%d/%m/%Y") as data_cadastro FROM noticias WHERE deletado = ? \
			ORDER BY data_cadastro ', [0]).then(data => {
				resolve(data);
			});
		});
	}

	GetUsuarios() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE deletado = ?	ORDER BY data_cadastro ', [0]).then(data => {
				resolve(data);
			});
		});
	}

	GetCoachings() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *,DATE_FORMAT(data_cadastro, "%d/%m/%Y") as data_cadastro FROM coaching WHERE deletado = ?	ORDER BY data_cadastro ', [0]).then(data => {
				resolve(data);
			});
		});
	}

	CadastrarNoticia(POST) {
		return new Promise(function(resolve, reject) {
			helper.Insert('noticias', POST).then(data => {
				resolve(data);
			});
		});
	}

	CadastrarUsuario(POST) {	
		return new Promise(function(resolve, reject) {
			POST.senha = helper.Encrypt(POST.senha);
			helper.Insert('usuarios', POST).then(data => {
				resolve(data);
			});
		});
	}

	CadastrarCoaching(POST) {	
		return new Promise(function(resolve, reject) {
			helper.Insert('coaching', POST).then(data => {
				resolve(data);
			});
		});
	}


	AtualizarNoticia(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('noticias', POST).then(data => {
				console.log('MMMMMMMMMMMMMM MODEL ATUALIZAR NOTICIA MMMMMMMMMMMMMMMMM');
				console.log(data);
				console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')
				resolve(data);
			});
		});
	}

	AtualizarUsuario(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('usuarios', POST).then(data => {
				resolve(data);
			});
		});
	}

	AtualizarCoaching(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('coaching', POST).then(data => {
				resolve(data);
			});
		});
	}


	
	DesativarNoticia(POST) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('noticias', POST).then(data => {
				resolve(data);
			});
		});
	}

	DesativarUsuario(POST) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('usuarios', POST).then(data => {
				resolve(data);
			});
		});
	}
	
	DesativarCoaching(POST) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('coaching', POST).then(data => {
				resolve(data);
			});
		});
	}
	
	
	
	
	
	
	
}
module.exports = AdministracaoModel;