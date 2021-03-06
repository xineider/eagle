(function($){
	$(function(){
		$('.menu_lateral').sidenav();
	});
})(jQuery); 

$(document).on('ready', function () {
	
	$(document).ready(function(){
		$('.modal').modal();
	});
	
	adicionarLoader();
	FormatInputs();
	calendarioCompromissos();
	
	$(document).ajaxComplete(function () {
		calendarioCompromissos();
		M.updateTextFields();
	});
	$(document).ajaxError(function () {
		AddErrorAjax();
	});
	$(document).ajaxSuccess(function () {
		$('.error_ajax').fadeOut();
		$('.timepicker').timepicker({
			defaultTime: 'now', // Set default time: 'now', '1:30AM', '16:30'
			twelveHour: false, // Use AM/PM or 24-hour format
			fromNow: 0,       // set default time to * milliseconds from now (using with default = 'now')
			i18n:{
				cancel:'Cancelar',
				clear:'Limpar',
				done:'Pronto'
			},
			autoClose: true, // automatic close timepicker
			
		});
		
		$('.datepicker').datepicker({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 190, // Creates a dropdown of 15 years to control year,
			i18n: {
				months:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
				monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
				weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
				weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
				weekdaysAbbrev: ['D','S','T','Q','Q','S','S'],
				cancel:'Cancelar',
				clear:'Limpar',
				done:'Pronto'
			},    
			today: 'Hoje',
			clear: 'Limpar',
			close: 'Pronto',
			labelMonthNext: 'Próximo mês',
			labelMonthPrev: 'Mês anterior',
			labelMonthSelect: 'Selecione um mês',
			labelYearSelect: 'Selecione um ano',
			format: 'dd/mm/yyyy',
			autoClose: true, // Close upon selecting a date,
			defaultTime: 'now'
		});

		$('.datepicker_container_input').datepicker({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 190, // Creates a dropdown of 15 years to control year,
			i18n: {
				months:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
				monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
				weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
				weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
				weekdaysAbbrev: ['D','S','T','Q','Q','S','S'],
				cancel:'Cancelar',
				clear:'Limpar',
				done:'Pronto'
			},    
			today: 'Hoje',
			clear: 'Limpar',
			close: 'Pronto',
			labelMonthNext: 'Próximo mês',
			labelMonthPrev: 'Mês anterior',
			labelMonthSelect: 'Selecione um mês',
			labelYearSelect: 'Selecione um ano',
			format: 'dd/mm/yyyy',
			autoClose: true, // Close upon selecting a date,
			defaultTime: 'now',
			onSelect:function(data_entregada){
				let mes = (1 + data_entregada.getMonth()).toString().padStart(2, '0');
				var valorData = data_entregada.getDate()+'/' + mes + '/' + data_entregada.getFullYear();
				$('#data_final_compromisso').val(valorData);
			} 
		});
		
		// var imagem_usuario_perfil = $('#imagem-usuario-config');
		
		// if(typeof imagem_usuario_perfil != undefined){
			
		// 	console.log('iiiiiiiiiiiiiiiiii imagem_usuario_perfil iiiiiiiiiiiiiiiii');
		// 	console.log(imagem_usuario_perfil);
		// 	console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
		
		// 	$(imagem_usuario_perfil).cropper({
		// 		aspectRatio: 1 / 1
		// 	});
		// }
	});
	
	$(document).on('click', '.modal-remover-mount', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var texto = $(this).data('texto');
		var id = $(this).data('id');
		var to = $(this).data('to');
		var back = $(this).data('back');
		
		$(modal).modal('open');
		$(modal).find('#texto').text(texto);
		$(modal).find('#id').val(id);
		$(modal).find('button').data('href', to).data('action', back);
	});
	
	$(document).on('click', '.modal-mount', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var link = $(this).data('link');
		MountModal(modal, link);
	});

	setTimeout(function(){
		window.location.href="/logout";
	}, 1800000);
	
	// $(document).on('click', '.crop-image-servidor', function(e) {
	// 	e.preventDefault()
	
	// 	var cropper = $('#imagem-usuario-config').data('cropper');
	// 	console.log('croppper');
	// 	console.log(cropper);
	// 	var back = $(this).data('action');
	// 	console.log(back);
	
	// 	cropper.getCroppedCanvas().toBlob((blob) => {
	// 		var formData = new FormData();
	// 		formData.append('arquivo', blob);
	// 		console.log(formData);
	
	// 		$.ajax({
	// 			url: '/sistema/perfil/cropImagemPerfil',
	// 			type: 'POST',
	// 			data: formData,
	// 			dataType: 'json',
	// 			processData: false,
	// 			contentType: false,
	// 			beforeSend: function(request) {
	// 				request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
	// 				request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
	// 				request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());
	// 				adicionarLoader();
	// 			},
	// 			success: function (data) {
	// 				console.log('---------- sucesso cropp -----------------');
	// 				console.log(data);
	// 				console.log(typeof data != undefined);
	// 				console.log(data > 0);
	
	// 				if (typeof data != undefined) {
	// 					M.toast({html:'<div class="center-align" style="width:100%;">Imagem Alterada com sucesso</div>', 
	// 					displayLength:5000, classes:'green'});
	// 				}
	// 				console.log(back);
	
	// 				if (typeof back != 'undefined' && back != 'add_name') {
	// 					console.log('estou caindo no goTo do :D');
	// 					GoTo(back, true);
	// 				}
	// 			},
	// 			error: function (xhr, e, t) {
	// 				console.debug((xhr.responseText));
	// 			},
	// 			complete: function() {
	// 				removerLoader();
	// 			}
	// 		});
	// 	});
	// });
	
	
	
	
	$(document).on('click', '.ajax-load', function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		console.log(link);
		GoTo(link, true);
	});
	
	$(document).on('click', '.ajax-load-to', function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		var to = $(this).data('to');
		LoadTo(link, to);
	});
	
	$(document).on('click', '.remove', function (e) {
		e.preventDefault();
		$(this).closest('.pai').remove();
	});
	
	$(document).on('click', '.ajax-submit', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var sucessMessage = 'Cadastrado com Sucesso';
		var sucessClass = 'green';

		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back,sucessMessage,sucessClass);
		}
	});
	
	$(document).on('click', '.ajax-submit-update', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var sucessMessage = 'Atualizado com Sucesso';
		var sucessClass = 'green';
		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back,sucessMessage,sucessClass);
		}
	});

	$(document).on('click', '.ajax-submit-update-mensagem', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var sucessMessage = $(this).data('mensagem-sucesso');
		var sucessClass = 'green';
		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back,sucessMessage,sucessClass);
		}
	});

	$(document).on('click', '.ajax-submit-one-item', function(e) {
		e.preventDefault();
		var informacao = $(this).data('arquivo');
		var link = $(this).data('href');
		var back = $(this).data('action');
		var sucessMessage = $(this).data('mensagem-sucesso');
		var sucessClass = 'green';
		EnviarUmaInformacao(informacao,link,sucessMessage,sucessClass);
	});

	$(document).on('click', '.ajax-submit-delete', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var sucessMessage = 'Deletado com Sucesso';
		var sucessClass = 'red';
		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back,sucessMessage,sucessClass);
		}
	});

	$(document).on('click', '.pedir-saque', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var sucessMessage = 'Saque Pedido com Sucesso';
		var sucessClass = 'green';

		if (VerificarForm(form) == true) {
			var caixa_saque = parseFloat($('#valor_caixa_saque').val());
			var caixa_saque_total = parseFloat($('#valor_caixa_total_saque').val());

			if(caixa_saque > caixa_saque_total){
				AddErrorTexto($('#valor_caixa_saque'),'Valor Maior do que tem para Sacar!!');	
			}else{
				SubmitAjax(post, link, back,sucessMessage,sucessClass);
			}


			
		}
	});

	$(document).on('click', '.pedir-aporte', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var sucessMessage = 'Aporte Pedido com Sucesso';
		var sucessClass = 'green';

		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back,sucessMessage,sucessClass);
			
		}
		
	});


	
	
	$(document).on('change', '.arquivo_imagem', function () {
		if($(this).val() != '') {
			UploadImagem($(this),'.'+$(this).data('container'));
		}
	});

	$(document).on('change', '.arquivo_imagem_perfil', function () {
		if($(this).val() != '') {
			UploadImagemPerfil($(this),'.'+$(this).data('container'));
		}
	});

	$(document).on('change', '.arquivo_comprovante', function () {
		if($(this).val() != '') {
			UploadComprovante($(this),'.'+$(this).data('container'));
		}
	});



	
	$(document).on('change', '.cadastrar_evento_tipo_compromisso_select', function(e) {
		
		console.log('----------------- VALOR DO SELECT ---------------');
		console.log($(this).val());
		console.log('-------------------------------------------------');
		
		if($(this).val() == 1){
			$('.cadastrar_evento_coachee_container').empty();
		}else if($(this).val() == 0){
			LoadTo('/sistema/agenda/lista-coachees', 'cadastrar_evento_coachee_container');
		}
		
	});


	$(document).on('change', '.cadastrar_usuario_nivel_select', function(e) {
		
		console.log('----------------- VALOR DO SELECT ---------------');
		console.log($(this).val());
		console.log('-------------------------------------------------');
		
		if($(this).val() != 0){
			$('.cadastrar_usuario_coach_container').empty();
		}else if($(this).val() == 0){
			LoadTo('/sistema/administracao/lista-coachs', 'cadastrar_usuario_coach_container');
		}
		
	});

	

	$(document).on('change', '.perfil_saque_select', function(e) {
		
		console.log('----------------- VALOR DO SELECT ---------------');
		console.log($(this).val());
		console.log('-------------------------------------------------');

		var valor_perfil = $('#valor_perfil-'+$(this).val()).val();
		var valor_rendimento = $('#valor_perfil_rendimento-'+$(this).val()).val();
		console.log(valor_perfil);
		console.log(valor_rendimento);

		$('#valor_para_sacar').html(valor_perfil);
		$('#valor_rendimento_para_sacar').html(valor_rendimento);
		$('#valor_caixa_total_saque').val(valor_perfil);
		
	});
	
	$(document).on('submit', 'form', function(e) {
		e.preventDefault();
	});
	
	$(document).on('change', '.cep', function () {
		GetEndereco($(this).val(), $(this).closest('.row'));
	});
	
	
	window.onpopstate = function() {
		GoTo(location.pathname, false);
	};
	// ALTERE CORRETAMENTE PARA FUNCIONAR DE ACORDO
	
	$(document).on('change', '.timepicker', function () {
		$(this).focus();
	});

	$(document).on('click', '.botao_menu', function(e) {
		var navbarE = document.querySelector('.menu_lateral');
		var navbarI = M.Sidenav.init(navbarE,{edge:'left'});
		navbarI.open();
	});
	
	
	
	$(document).on('click', '.arquivo-escolha', function(e) {
		e.preventDefault();
		var nome = $(this).data('nome');
		$('.uploads').append('\
			<div class="col s12 m6 center-align relative pai">\
			<div class="card-panel grey lighten-4">\
			<input type="hidden" name="tarefa_arquivo[arquivo][]" value="'+nome+'">\
			<button class="btn-floating btn waves-effect waves-light red close-button remove"><i class="fa fa-times" aria-hidden="true"></i></button>\
			<b>Arquivo: '+nome+' <br>\
			</div>\
			</div>\
			');
		$('.modal').modal('close');
	});
	
	// EVENTOS ESPECIFICOS
});
// Eventos Após DOM
$(window).on('load', function (e) {
	removerLoader();
	FormatInputs();
});



// Funções
function adicionarLoader() {
	$('body').css('overflow', 'hidden');
	$('.loader').fadeIn('fast');
}
function removerLoader() {
	$('body').css('overflow', 'auto');
	$('.loader').fadeOut('fast');
}

function GoTo(link, state) {
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			console.log('lllllllllllllll link llllllllllllll');
			console.log(link);
			console.log('lllllllllllllllllllllllllllllllllll');
			request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('main').html(data);
			if(link == '/sistema/'){
				$('#voltar').addClass('hide');
			}else{
				$('#voltar').removeClass('hide');
			}
			LogSistema('GET',link);
		},
		error: function(xhr) { // if error occured
		},
		complete: function() {
			removerLoader();
			$('.material-tooltip').remove();
			$('.tooltipped').tooltip({delay: 50});
			$('.modal').modal('close');
			FormatInputs();
			$('.menu_lateral').sidenav('close');
		}
	});
	if (state == true) {
		window.history.pushState('Eagle Finance', 'Eagle Finance', link);
		console.log('history state');
		console.log(history);
		console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
	}
}

function LoadTo(link, to) {
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-nivel", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			console.log('____________________LoadTo______________________');
			console.log(data);
			console.log('________________________________________________');
			$('.'+to).html(data);
			LogSistema('GET',link);
		},
		error: function(xhr) { // if error occured
		},
		complete: function() {
			removerLoader();
			$('.material-tooltip').remove();
			$('.tooltipped').tooltip({delay: 50});
			$('.modal').modal('close');
			FormatInputs();
		}
	});
}

function FormatInputs(focus) {
	$('.cnpj').mask('00.000.000/0000-00', {reverse: true});
	$('.cpf').mask('000.000.000-00', {reverse: true});
	$('.rg').mask('AAAAAAAAAAAAA', {reverse: true});
	$('.cep').mask('00000-000');
	$('.tel').mask('(00) Z0000-0000', {
		translation: {
			'Z': {
				pattern: /[0-9]/, optional: true
			}
		}
	});
	$('.money').mask('000000000000000,00', {reverse: true});
	AddFormatEspecifico();
	$('select').formSelect();
	ActiveMaterializeInput(focus);
	
	$('.timepicker').timepicker({
		defaultTime: 'now', // Set default time: 'now', '1:30AM', '16:30'
		twelveHour: false, // Use AM/PM or 24-hour format
		fromNow: 0,       // set default time to * milliseconds from now (using with default = 'now')
		i18n:{
			cancel:'Cancelar',
			clear:'Limpar',
			done:'Pronto'
		},
		autoClose: true // automatic close timepicker
		
	});
	
	$('.datepicker').datepicker({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 190, // Creates a dropdown of 15 years to control year,
		i18n: {
			months:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
			monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
			weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
			weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
			weekdaysAbbrev: ['D','S','T','Q','Q','S','S'],
			cancel:'Cancelar',
			clear:'Limpar',
			done:'Pronto'
		},    
		today: 'Hoje',
		clear: 'Limpar',
		close: 'Pronto',
		labelMonthNext: 'Próximo mês',
		labelMonthPrev: 'Mês anterior',
		labelMonthSelect: 'Selecione um mês',
		labelYearSelect: 'Selecione um ano',
		format: 'dd/mm/yyyy',
		autoClose: true, // Close upon selecting a date,
		defaultTime: 'now'
	});
	

	$('.datepicker_container_input').datepicker({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 190, // Creates a dropdown of 15 years to control year,
		i18n: {
			months:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
			monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
			weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
			weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
			weekdaysAbbrev: ['D','S','T','Q','Q','S','S'],
			cancel:'Cancelar',
			clear:'Limpar',
			done:'Pronto'
		},    
		today: 'Hoje',
		clear: 'Limpar',
		close: 'Pronto',
		labelMonthNext: 'Próximo mês',
		labelMonthPrev: 'Mês anterior',
		labelMonthSelect: 'Selecione um mês',
		labelYearSelect: 'Selecione um ano',
		format: 'dd/mm/yyyy',
		autoClose: true, // Close upon selecting a date,
		defaultTime: 'now',
		onSelect:function(data_entregada){
			let mes = (1 + data_entregada.getMonth()).toString().padStart(2, '0');
			var valorData = data_entregada.getDate()+'/' + mes + '/' + data_entregada.getFullYear();
			$('#data_final_compromisso').val(valorData);
		} 
	});
	
	
	// var imagem_usuario_perfil = $('#imagem-usuario-config');
	
	// if(typeof imagem_usuario_perfil != undefined){
		
	// 	console.log('iiiiiiiiiiiiiiiiii imagem_usuario_perfil iiiiiiiiiiiiiiiii');
	// 	console.log(imagem_usuario_perfil);
	// 	console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
	
	// 	$(imagem_usuario_perfil).cropper({
	// 		aspectRatio: 1 / 1
	// 	});
	// }
}

function GetEndereco(cep, pai) {
	var link = 'https://viacep.com.br/ws/'+cep+'/json/ ';
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			adicionarLoader();
		},
		success: function(data) {
			console.log(data);
			if (data['erro'] == true) {
				alert('CEP não encontrado');
				$(pai).find('.uf').focus();
			} else {
				$(pai).find('.cidade').val(data['localidade']).focus();
				$(pai).find('.rua').val(data['logradouro']).focus();
				$(pai).find('.uf').val(data['uf']).focus();
				$(pai).find('.numero').focus();
			}
		},
		error: function(xhr) { // if error occured
			alert("CEP não encontrado, utilize somente números");
			$(pai).find('.uf').focus();
		},
		complete: function() {
			removerLoader();
		}
	});
}

function SubmitAjax(post, link, back,sucessMessage,sucessClass) {
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			console.log('----------- DATA SUBMITAJAX ---------');
			console.log(data);
			console.log('-------------------------------------');

			/*update tambem retorna objeto, então tenho que validar ele pelo error*/	
			if (typeof data == 'object' && data['error'] != null){
				AddErrorTexto($(data['element']),data['texto']);	
			}else if(data != undefined){
				M.toast({html:'<div class="center-align" style="width:100%;">'+sucessMessage+'</div>', displayLength:5000, classes: sucessClass});
				if(back != ''){
					GoTo(back, true);
				}
			}
			LogSistema('POST',link);
		},
		error: function(xhr) { // if error occured
		},
		complete: function() {
			removerLoader();
		}
	});
}

function ActiveMaterializeInput(focus) {
	if (focus != undefined && focus != 'undefined') {
		console.log(focus);
		focus.first().focus();
		return true;
	}
	$('main textarea:not(disabled)').each(function () {
		if ($(this).val() != '') {
			$(this).focus();
		}
	});
	$('main input:not(disabled)').each(function () {
		if ($(this).val() != '') {
			$(this).focus();
			$('main input:not([disabled]):not([type="hidden"])').first().focus();
		}
	});
}
function MountModal(modal, link) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema'+link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			console.log(link);
			$(modal).find('.modal-content').html(data);
			$(modal).modal('open');
			LogSistema('GET',link);
		},
		error: function(xhr) { // if error occured
		},
		complete: function() {
			removerLoader();
			$('.material-tooltip').remove();
			$('.tooltipped').tooltip({delay: 50});
			FormatInputs();
		}
	});
}




function VerificarForm(form) {
	$('.error').remove();
	var qtdErros = 0;
	
	form.find('input:enabled:not([type="hidden"])[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			qtdErros++;
		};
		if($('#alterar_senha').val() != $('#confirmar_alterar_senha').val())
		{
			AddErrorTexto($('#confirmar_alterar_senha'),'Senhas são diferentes');
			qtdErros++;
		}
	});

	form.find('input:enabled:not([type="hidden"])[required="true"][type="email"]').each(function(){
		if($(this).val()!= ''){
			if(!validateEmail($(this).val())){
				qtdErros++;
				AddErrorTexto($(this),'Email Incorreto!!');
			}
		}
	});
	
	form.find('textarea:enabled[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			qtdErros++;
		};
	});
	
	form.find('select:enabled[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			qtdErros++;
		};
	});
	
	if(qtdErros > 0){
		return false;
	}else if(qtdErros <= 0){
		return true;
	}
}


function VerificaItem(isso) {
	if (isso.val() == '') {
		AddError(isso);
		return true;
	}
}
function AddError(isso) {
	console.log(isso);
	isso.focus().addClass('observe-post').parent().append('<div class="error">Complete corretamente</div>');
}
function AddErrorTexto(isso,texto) {
	isso.focus().addClass('observe-post').parent().append('<div class="error">'+texto+'</div>');
}

function AddErrorTextoSemFocus(isso,texto){
	isso.addClass('observe-post').parent().append('<div class="error">'+texto+'</div>');
}
function AddErrorAjax() {
	$('.error_ajax').fadeIn();
}
// ALTERE PARA FUNCIONAR CORRETAMENTE
function UploadImagem(isso,container) {
	var link = isso.data('href');
	if(isso[0].files[0].size < 5120000){
		console.log('FILE UPLOAD');
		console.log(isso[0].files[0]);
		var formData = new FormData();
		formData.append('arquivo', isso[0].files[0]);

		// Se existe o erro quando o usuario enviar outro arquivo deve excluir o erro
		if(isso.siblings().hasClass('error')){
			isso.siblings('.error').remove();
		}

		$.ajax({
			url: link,
			type: 'POST',
			data: formData,
			dataType: 'json',
			processData: false,
			contentType: false,
			beforeSend: function(request) {
				request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());
				adicionarLoader();
			},
			success: function (data) {
				console.log('data ----------------');
				console.log(data);
				if (typeof data == 'object' && data['error'] != null){
					AddErrorTexto($(data['element']),data['texto']);
					LogSistema('POST',link+'_failed');		
				}else if(data != undefined){
					$('.file-path').val('');

					$(container).empty();

					$(container).append('\
						<div class="pai">\
						<img src="/assets/uploads/'+data+'">\
						<button class="btn waves-effect waves-light red close-button remove margin-b-10">Remover Imagem</button>\
						<input type="hidden" name="arquivo" value="/assets/uploads/'+data+'">\
						</div>');
					console.debug(data);
					LogSistema('POST',link);
				}
			},
			error: function (xhr, e, t) {
				console.debug((xhr.responseText));
			},
			complete: function() {
				removerLoader();
			}
		});
	}else{
		LogSistema('POST',link+'_failed_arquivo_grande');
		AddErrorTexto(isso,'Arquivo Muito Grande, envie outro!');
	}
}


function LogSistema(metodo,rota){
	var ip;
	var arrayValores = [];

	$.getJSON("https://api.ipify.org/?format=json", function(e) {
		ip = e.ip;
		arrayValores = [ip,metodo,rota,navigator.userAgent,$('input[name="id_usuario_sessao"]').val()];

		$.ajax({
			url:'/sistema/log',
			type:'POST',
			data:JSON.stringify(arrayValores),
			contentType: 'application/json', 
			beforeSend: function(request) {
			}
		});
	});
}


function validateEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}


function UploadImagemPerfil(isso,container) {
	var link = isso.data('href');
	if(isso[0].files[0].size < 5120000){
		var formData = new FormData();

		formData.append('arquivo', isso[0].files[0]);

		// Se existe o erro quando o usuario enviar outro arquivo deve excluir o erro
		if(isso.siblings().hasClass('error')){
			isso.siblings('.error').remove();
		}


		$.ajax({
			url: link,
			type: 'POST',
			data: formData,
			dataType: 'json',
			processData: false,
			contentType: false,
			beforeSend: function(request) {
				request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());
				adicionarLoader();
			},
			success: function (data) {
				if (typeof data == 'object' && data['error'] != null){
					AddErrorTexto($(data['element']),data['texto']);
					LogSistema('POST',link+'_failed');	
				}else if(data != undefined){
					$('.file-path').val('');

					console.log('data ----------------');
					console.log(data);
					$(container).empty();

					$(container).append('\
						<div class="pai">\
						<img src="/assets/imagem_perfil/'+data+'">\
						<button class="btn waves-effect waves-light red close-button remove margin-b-10">Remover Imagem</button>\
						<input type="hidden" name="imagem" value="/assets/imagem_perfil/'+data+'">\
						</div>');
					$('.img-user img').prop('src','/assets/imagem_perfil/'+data);
					console.debug(data);
					LogSistema('POST',link);
				}
			},
			error: function (xhr, e, t) {
				console.debug((xhr.responseText));
			},
			complete: function() {
				removerLoader();
			}
		});
	}else{
		LogSistema('POST',link+'_failed_arquivo_grande');
		AddErrorTexto(isso,'Arquivo Muito Grande, envie outro!');
	}
}

function UploadComprovante(isso,container) {
	var link = isso.data('href');
	if(isso[0].files[0].size < 10240000){		
		console.log('FILE UPLOAD');
		console.log(isso[0].files[0]);
		var formData = new FormData();
		formData.append('arquivo', isso[0].files[0]);

		// Se existe o erro quando o usuario enviar outro arquivo deve excluir o erro
		if(isso.siblings().hasClass('error')){
			isso.siblings('.error').remove();
		}

		$.ajax({
			url: link,
			type: 'POST',
			data: formData,
			dataType: 'json',
			processData: false,
			contentType: false,
			beforeSend: function(request) {
				request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());
				adicionarLoader();
			},
			success: function (data) {
				if (typeof data == 'object' && data['error'] != null){
					AddErrorTexto($(data['element']),data['texto']);
					LogSistema('POST',link+'_failed');	
				}else if(data != undefined){
					$('.file-path').val('');

					console.log('container cccccccccccccccc');
					console.log(container);

					$(container).empty();

					$(container).append('\
						<div class="col s12 m6 center-align relative pai">\
						<div class="card-panel light break-all">\
						<input type="hidden" name="arquivo" value="/assets/uploads/'+data+'">\
						<button class="btn-floating btn waves-effect waves-light red close-button remove"><i class="fa fa-times" aria-hidden="true"></i></button>\
						<b>Comprovante: '+data+' <br>\
						</div>\
						</div>\
						');
					console.debug(data);
					LogSistema('POST',link);
				}
			},
			error: function (xhr, e, t) {
				console.debug((xhr.responseText));
			},
			complete: function() {
				removerLoader();
			}
		});
	}else{
		LogSistema('POST',link+'_failed_arquivo_grande');
		AddErrorTexto(isso,'Arquivo Muito Grande, envie outro!');
	}
}


function EnviarUmaInformacao(informacao,link,sucessMessage,sucessClass) {
	console.log('!!!!!!! Enviar uma Informação !!!!!!!!');
	console.log(informacao);
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	var formData = new FormData();
	formData.append('informacao', informacao);

	$.ajax({
		url: link,
		type: 'POST',
		data: formData,
		dataType: 'json',
		processData: false,
		contentType: false,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function (data) {
			if (typeof data == 'object' && data['error'] != null){
				AddErrorTexto($(data['element']),data['texto']);
				LogSistema('POST',link+'_failed');	
			}else if(data != undefined){
				M.toast({html:'<div class="center-align" style="width:100%;">'+sucessMessage+'</div>', displayLength:5000, classes: sucessClass});
				LogSistema('POST',link);
			}

		},
		error: function (xhr, e, t) {
			console.debug((xhr.responseText));
		},
		complete: function() {
			removerLoader();
		}
	});
}



// ESPECIFICO
function AddFormatEspecifico() {
	$('.dropdown-button').dropdown();
	$('.collapsible').collapsible();
}


function calendarioCompromissos(){
	$('#calendar').fullCalendar({
		header:{
			left:   'today prev,next',
			center: '',
			right:  'month,agendaWeek,agendaDay,listMonth'
		},
		buttonText:{
			today:'Hoje',
			month:'Mês',
			week:'Semana',
			day:'Dia',
			list:'Lista'
		},
		events: {
			url:'/sistema/agenda/eventos/',
			method:"GET",
			async:true,
			beforeSend:function(request){
				request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
				request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());
			}
		},
		timezone:'local',
		editable:false,
		eventClick: function(event, jsEvent, view) {
			$.ajax({
				method: "GET",
				async: true,
				url: '/sistema/agenda/editar_evento/'+event.id,
				beforeSend: function(request) {
					console.log('setando');
					request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());					
					adicionarLoader();
				},
				success: function(data) {
					console.log('DDDDDDDDD CLIQUEI NO EVENTO DATA SUCCESSS DDDDDDD');
					console.log(data);
					console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
					$('.adicionar_compromisso_container').html(data);
				},
				error: function(xhr) { // if error occured
					removerLoader();
				},
				complete: function() {
					removerLoader();
					FormatInputs();
				}
			});
		}
		
	});
}