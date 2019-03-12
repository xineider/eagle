'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class IndexModel {
	Login(POST) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT id FROM usuarios WHERE login = ? AND senha = ?', [POST.login, POST.senha]).then(data => {
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
module.exports = IndexModel;