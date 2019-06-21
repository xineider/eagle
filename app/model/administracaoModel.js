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
	
	
	SelecionarAviso(id) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT * FROM avisos WHERE id = ? AND deletado = ?", [id,0]).then(data => {
				resolve(data);
			});
		});
	}


	VerSeTemPedidoSaque() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.* \
				FROM caixa as a WHERE a.deletado = ? AND a.tipo = ? AND a.confirmado = ?', [0,1,0]).then(data => {
					resolve(data);
				});
			});
	}

	VerSeTemPedidoAporte() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.* \
				FROM caixa as a WHERE a.deletado = ? AND a.tipo = ? AND a.confirmado = ?', [0,0,0]).then(data => {
					resolve(data);
				});
			});
	}


	SelecionarPedidoSaque(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,REPLACE(a.valor,".",",") as valor,DATE_FORMAT(data_cadastro, "%d/%m/%Y") as data_cadastro, \
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario AND b.deletado = ?) as nome, \
				(SELECT c.nome FROM planos as c WHERE c.id = a.id_plano AND c.deletado = ?) as plano \
				FROM caixa as a WHERE a.id = ? AND a.deletado = ? AND a.tipo = ? AND a.confirmado = ?', [0,0,id,0,1,0]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarPedidoAporte(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,REPLACE(a.valor,".",",") as valor,DATE_FORMAT(data_cadastro, "%d/%m/%Y") as data_cadastro, \
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario AND b.deletado = ?) as nome, \
				(SELECT c.nome FROM planos as c WHERE c.id = a.id_plano AND c.deletado = ?) as plano \
				FROM caixa as a WHERE a.id = ? AND a.deletado = ? AND a.tipo = ? AND a.confirmado = ?', [0,0,id,0,0,0]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarPedidoRendimento(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,REPLACE(a.valor,".",",") as valor,DATE_FORMAT(data_cadastro, "%d/%m/%Y") as data_cadastro, \
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario AND b.deletado = ?) as nome, \
				(SELECT c.nome FROM planos as c WHERE c.id = a.id_plano AND c.deletado = ?) as plano \
				FROM caixa as a WHERE a.id = ? AND a.deletado = ? AND a.tipo = ? AND a.confirmado = ?', [0,0,id,0,2,0]).then(data => {
					resolve(data);
				});
			});
	}




	SelecionarPorcentagemComissao(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *,  \
				CASE \
				WHEN id_tipo = 1 THEN "Coach"  \
				WHEN id_tipo = 2 THEN "Manager" \
				ELSE id_tipo END as nivel FROM porcentagem_comissao WHERE deletado = ? AND id = ?', [0,id]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarCaixa(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, REPLACE(a.valor,".",",") as valor,DATE_FORMAT(a.data_cadastro, "%d/%m/%Y") as data_cadastro,\
				(SELECT nome FROM planos as b WHERE b.id = a.id_plano) as plano,\
				(SELECT nome FROM usuarios as c WHERE c.id = a.id_usuario) as nome_usuario\
				FROM caixa as a WHERE a.deletado = ? and id = ?', [0,id]).then(data => {
					resolve(data);
				});
			});
	}

	SelecionarComissao(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, REPLACE(a.valor,".",",") as valor, DATE_FORMAT(a.data_cadastro, "%d/%m/%Y") as data_cadastro,\
				(SELECT nome FROM usuarios as c WHERE c.id = a.id_usuario) as nome_usuario\
				FROM comissao as a WHERE a.deletado = ? and id = ?', [0,id]).then(data => {
					resolve(data);
				});
			});
	}
	
	

	
	
	VerificarSeTemLoginDisponivel(login){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT login \
				FROM usuarios WHERE deletado = ? AND login = ?", [0,login]).then(data => {
					resolve(data);
				});
			});
	}

	VerificarSeTemEmailDisponivel(email){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT email \
				FROM usuarios WHERE deletado = ? AND email = ?", [0,email]).then(data => {
					resolve(data);
				});
			});
	}

	VerificarSeTemMesmoLogin(POST){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT login \
				FROM usuarios WHERE deletado = ? AND login = ? AND id = ?", [0,POST.login,POST.id]).then(data => {
					resolve(data);
				});
			});
	}

	VerificarSeTemMesmoEmail(POST){
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT email \
				FROM usuarios WHERE deletado = ? AND email = ? AND id = ?", [0,POST.email,POST.id]).then(data => {
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

	GetUsuariosMenosProprio(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE deletado = ? AND id != ?	ORDER BY data_cadastro ', [0,id]).then(data => {
				resolve(data);
			});
		});
	}

	GetCoach() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE deletado = ? AND (nivel = ? OR nivel = ?)', [0,1,2]).then(data => {
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
	
	GetAvisos() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *,DATE_FORMAT(data_cadastro, "%d/%m/%Y") as data_cadastro FROM avisos WHERE deletado = ? ORDER BY data_cadastro ', [0]).then(data => {
				resolve(data);
			});
		});
	}

	GetPlanos() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM planos WHERE deletado = ?', [0]).then(data => {
				resolve(data);
			});
		});
	}


	GetPorcentagemComissao() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT *,  \
				CASE \
				WHEN id_tipo = 1 THEN "Coach"  \
				WHEN id_tipo = 2 THEN "Manager" \
				ELSE id_tipo END as nivel FROM porcentagem_comissao WHERE deletado = ?', [0]).then(data => {
					resolve(data);
				});
			});
	}

	
	GetGanhosMensais() {
		return new Promise(function(resolve, reject) {
			helper.Query('	SELECT a.*, \
				CASE \
				WHEN mes = 1 THEN "Janeiro" \
				WHEN mes = 2 THEN "Fevereiro" \
				WHEN mes = 3 THEN "Março" \
				WHEN mes = 4 THEN "Abril" \
				WHEN mes = 5 THEN "Maio" \
				WHEN mes = 6 THEN "Junho" \
				WHEN mes = 7 THEN "Julho" \
				WHEN mes = 8 THEN "Agosto" \
				WHEN mes = 9 THEN "Setembro" \
				WHEN mes = 10 THEN "Outubro" \
				WHEN mes = 11 THEN "Novembro" \
				WHEN mes = 12 THEN "Dezembro" \
				ELSE mes END as nome_mes, \
				(SELECT b.nome FROM planos as b WHERE b.id = a.id_plano AND b.deletado=?) as plano \
				FROM ganhos_mensal as a WHERE a.deletado = ?', [0,0]).then(data => {
					resolve(data);
				});
			});
	}








	GetPedidosSaques() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,REPLACE(a.valor,".",",") as valor,DATE_FORMAT(data_cadastro, "%d/%m/%Y") as data_cadastro, \
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario AND b.deletado = ?) as nome, \
				(SELECT c.nome FROM planos as c WHERE c.id = a.id_plano AND c.deletado = ?) as plano \
				FROM caixa as a WHERE a.deletado = ? AND a.tipo = ? AND a.confirmado = ?', [0,0,0,1,0]).then(data => {
					resolve(data);
				});
			});
	}


	GetPedidosAportes() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,REPLACE(a.valor,".",",") as valor,DATE_FORMAT(data_cadastro, "%d/%m/%Y") as data_cadastro, \
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario AND b.deletado = ?) as nome, \
				(SELECT c.nome FROM planos as c WHERE c.id = a.id_plano AND c.deletado = ?) as plano \
				FROM caixa as a WHERE a.deletado = ? AND a.tipo = ? AND a.confirmado = ?', [0,0,0,0,0]).then(data => {
					resolve(data);
				});
			});
	}


	GetPedidosRendimentos() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,REPLACE(a.valor,".",",") as valor,DATE_FORMAT(data_cadastro, "%d/%m/%Y") as data_cadastro, \
				(SELECT b.nome FROM usuarios as b WHERE b.id = a.id_usuario AND b.deletado = ?) as nome, \
				(SELECT c.nome FROM planos as c WHERE c.id = a.id_plano AND c.deletado = ?) as plano \
				FROM caixa as a WHERE a.deletado = ? AND a.tipo = ? AND a.confirmado = ?', [0,0,0,2,0]).then(data => {
					resolve(data);
				});
			});
	}

	GetCaixa() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, REPLACE(a.valor,".",",") as valor,DATE_FORMAT(a.data_cadastro, "%d/%m/%Y") as data_cadastro,\
				(SELECT nome FROM planos as b WHERE b.id = a.id_plano) as plano,\
				(SELECT nome FROM usuarios as c WHERE c.id = a.id_usuario) as nome_usuario\
				FROM caixa as a WHERE a.deletado = ?', [0]).then(data => {
					resolve(data);
				});
			});
	}

	GetComissoes() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, REPLACE(a.valor,".",",") as valor,DATE_FORMAT(a.data_cadastro, "%d/%m/%Y") as data_cadastro,\
				(SELECT nome FROM usuarios as c WHERE c.id = a.id_usuario) as nome_usuario\
				FROM comissao as a WHERE a.deletado = ?', [0]).then(data => {
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
	
	CadastrarAviso(POST) {	
		return new Promise(function(resolve, reject) {
			helper.Insert('avisos', POST).then(data => {
				resolve(data);
			});
		});
	}

	CadastrarCaixa(POST) {	
		return new Promise(function(resolve, reject) {
			helper.Insert('caixa', POST).then(data => {
				resolve(data);
			});
		});
	}

	CadastrarComissao(POST) {	
		return new Promise(function(resolve, reject) {
			helper.Insert('comissao', POST).then(data => {
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
	
	AlterarSenhaUsuario(POST) {
		return new Promise(function(resolve, reject) {
			POST.senha = helper.Encrypt(POST.senha);
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
	
	AtualizarAviso(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('avisos', POST).then(data => {
				resolve(data);
			});
		});
	}

	AtualizarPedidoSaque(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('caixa', POST).then(data => {
				resolve(data);
			});
		});
	}

	AtualizarPedidoAporte(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('caixa', POST).then(data => {
				resolve(data);
			});
		});
	}

	AtualizarPedidoRendimento(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('caixa', POST).then(data => {
				resolve(data);
			});
		});
	}

	AtualizarPorcentagemComissao(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('porcentagem_comissao', POST).then(data => {
				resolve(data);
			});
		});
	}

	AtualizarCaixa(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('caixa', POST).then(data => {
				resolve(data);
			});
		});
	}

	AtualizarComissao(POST) {
		return new Promise(function(resolve, reject) {
			helper.Update('comissao', POST).then(data => {
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
	
	
	DesativarAviso(POST) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('avisos', POST).then(data => {
				resolve(data);
			});
		});
	}


	DesativarPedidoSaque(POST) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('caixa', POST).then(data => {
				resolve(data);
			});
		});
	}

	DesativarPedidoAporte(POST) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('caixa', POST).then(data => {
				resolve(data);
			});
		});
	}

	DesativarPedidoRendimento(POST) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('caixa', POST).then(data => {
				resolve(data);
			});
		});
	}

	DesativarCaixa(POST) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('caixa', POST).then(data => {
				resolve(data);
			});
		});
	}
	

	DesativarComissao(POST) {
		return new Promise(function(resolve, reject) {
			helper.Desativar('comissao', POST).then(data => {
				resolve(data);
			});
		});
	}
	
	
	
	
	
	
}
module.exports = AdministracaoModel;