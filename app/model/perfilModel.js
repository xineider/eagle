'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class PerfilModel {


	AtualizarUsuario(POST) {
		console.log('AAAAAAAAAAAAAA ATUALIZAR CONFIGURAÇÕES DO USUARIO AAAAAAAAAAAAAAAAAAAAAAA');
		console.log(POST);
		console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

		return new Promise(function(resolve, reject) {
			helper.Update('usuarios', POST).then(data => {
				console.log('xoxooxoxoxoxo data da atualização das configurações xxoxooxoxoxoxoxoxoxo');
				console.log(data);
				console.log('xoxooxoxxooxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoxoo');
				resolve(data);
			});
		});
	}

	GetUsuarioAlterarSenha(id,senhaAtual) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE deletado = ? AND id = ? AND senha = ?', [0, id,senhaAtual]).then(data => {
				resolve(data);
			});
		});
	}

	GetPerfil(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE id = ?', [id_usuario]).then(data => {
				console.log('DDDDDDDDDDDDDDDDDD DADOS DAS CONFIGURAÇÕES DO USUÁRIO DDDDDDDDDDDDDDDDDDDDDDDDD');
				console.log(data);
				console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
				resolve(data);
			});
		});
	}
}
module.exports = PerfilModel;