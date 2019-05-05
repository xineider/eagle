 'use strict';
 var express = require('express');
 var app = express();
 var Helper = require('./model.js');
 var helper = new Helper;

 class ApiModel {

 	CadastrarUsuario(data) {
 		return new Promise(function(resolve, reject) {
 			helper.Query('SELECT id FROM usuarios WHERE nome_murer = ?', [data.nome_murer]).then(result => {
 				if (result.length <= 0) {
 					helper.Insert('usuarios', data).then(data => {
 						resolve(data);
 					});
 				} else {
 					resolve([]);
 				}
 			});
 		});
 	}


 	PesquisarEmail(email) {
 		return new Promise(function(resolve, reject) {
 			/*seleciono o id para ver se existe algum usuario com aquele email*/
 			helper.Query('SELECT id	FROM usuarios WHERE email = ? AND deletado = ? LIMIT 1',[email,0]).then(data => {
 				resolve(data);
 			});
 		});
 	}


 	AlterarSenhaUsuarioPorId(POST){
 		return new Promise(function(resolve, reject) {
 			POST.senha = helper.Encrypt(POST.senha);
 			helper.Update('usuarios', POST).then(data => {
 				resolve(data);
 			});
 		});
 	}

 	VerificarSenha(data) {
 		if (typeof data.senha != 'undefined') {
 			if (data.senha == data.senha_confirmar) {
 				delete data.senha_confirmar;
 				var senha = helper.Encrypt(data.senha);
 				data.senha = senha;
 				return data;
 			} else {
 				return [];
 			}
 		} else {
 			return [];
 		}
 	}


 	Login(POST) {
 		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT id, nivel, imagem FROM usuarios WHERE nome_murer = ? AND senha = ?', [POST.nome_murer, POST.senha]).then(data => {
				if (typeof data != 'undefined' && data.length > 0) {
					var hash_login = helper.Encrypt(Date());
					data[0].hash_login = hash_login;
					helper.Update('usuarios', {id: data[0].id, hash_login: hash_login}).then(data_up => {
						resolve(data);
					});
				} else {
					resolve(data);
				}
			});
		});
 	}

 	Login(POST) {
 		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT id,nivel FROM usuarios WHERE login = ? AND senha = ?', [POST.login, POST.senha]).then(data => {
				if (typeof data != 'undefined' && data.length > 0) {
					var hash_login = helper.Encrypt(Date());
					data[0].hash_login = hash_login;
					helper.Update('usuarios', {id: data[0].id, hash_login: hash_login}).then(data_up => {
						resolve(data);
					});
				} else {
					resolve(data);
				}
			});
		});
 	}


 	VerificarDeletado(id){
 		return new Promise(function(resolve, reject) {
 			helper.Query('SELECT id FROM usuarios WHERE id = ? AND deletado = ?', [id,1]).then(data => {
 				resolve(data);
 			});
 		});
 	}

 }
 module.exports = ApiModel;