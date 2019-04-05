// Eventos DOM
$(document).on('ready', function () {
	
	$(document).ready(function(){
		$('.modal').modal();
	});
	
	LoadInfosUsuario();
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
	
	// $(document).on('click', '.crop-image-servidor', function(e) {
	// 	e.preventDefault();
		
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
		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back,sucessMessage);
		}
	});
	
	$(document).on('click', '.ajax-submit-update', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var sucessMessage = 'Atualizado com Sucesso';
		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back,sucessMessage);
		}
	});
	
	
	$(document).on('change', 'input[type="file"]', function () {
		if($(this).val() != '') {
			UploadFile($(this));
		}
	});
	
	$(document).on('submit', 'form', function(e) {
		e.preventDefault();
	});
	
	$(document).on('change', '.cep', function () {
		GetEndereco($(this).val(), $(this).closest('.row'));
	});
	
	$(".sidenav").sidenav({closeOnClick: true});
	
	window.onpopstate = function() {
		GoTo(location.pathname, false);
	};
	// ALTERE CORRETAMENTE PARA FUNCIONAR DE ACORDO
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
function InitBar() {
	if (localStorage.bar != 2 && localStorage.bar != 1) {
		localStorage.setItem("bar", 1);
	}
}
function GoTo(link, state) {
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			console.log('setando');
			request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('main').html(data);
		},
		error: function(xhr) { // if error occured
		},
		complete: function() {
			removerLoader();
			$('.material-tooltip').remove();
			$('.tooltipped').tooltip({delay: 50});
			$('.modal').modal('close');
			FormatInputs();
			$('.sidenav').sidenav('close');
		}
	});
	if (state == true) {
		window.history.pushState('Sistema Quorp', 'Sistema Quorp', link);
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
			$('.'+to).append(data);
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
function SubmitAjax(post, link, back,sucessMessage) {
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
			if (typeof data != undefined && data != 'error_alterar_senha_diferente') {
				M.toast({html:'<div class="center-align" style="width:100%;">'+sucessMessage+'</div>', displayLength:5000, classes:'green'});
			}
			if(data == 'error_alterar_senha_diferente'){
				AddErrorTexto($('#senha_atual'),'Senhas Atual Diferente!');				
			}else{
				GoTo(back, true);
			}
		},
		error: function(xhr) { // if error occured
		},
		complete: function() {
			removerLoader();
		}
	});
}
function Reestruturar(str) {
	var i = 1;
	$('.'+ str +' > div').each(function () {
		$(this).data('num', ''+i+'');
		i += 1;
	});
	return i;
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
			console.log('CAI AQUI DENTRO DO DIFERENTE');
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






// function VerificarForm() {
// 	var error = false;
// 	$('.error').remove();

// 	$('input:enabled:not([type="hidden"])[required="true"]').each(function(){
// 		if(VerificaItem($(this)) == true) {
// 			error = true;
// 			return false;
// 		};
// 	});
// 	$('textarea:enabled[required="true"]').each(function(){
// 		if(VerificaItem($(this)) == true) {
// 			error = true;
// 			return false;
// 		};
// 	});
// 	$('select:enabled[required="true"]').each(function(){
// 		if(VerificaItem($(this)) == true) {
// 			error = true;
// 			return false;
// 		};
// 	});
// 	if (error == false) {
// 		return true;
// 	}
// }


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
function AddErrorAjax() {
	$('.error_ajax').fadeIn();
}
// ALTERE PARA FUNCIONAR CORRETAMENTE
function UploadFile(isso) {
	var link = isso.data('href');
	var formData = new FormData();
	formData.append('arquivo', isso[0].files[0]);
	
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
			$('.file-path').val('');
			isso.closest('.row').append('\
			<div class="col s12 m6 center-align relative pai">\
			<div class="card-panel grey lighten-4">\
			<input type="hidden" name="tarefa_arquivo[arquivo][]" value="'+data+'">\
			<button class="btn-floating btn waves-effect waves-light red close-button remove"><i class="fa fa-times" aria-hidden="true"></i></button>\
			<b>Arquivo: '+data+' <br>\
			</div>\
			</div>\
			');
			console.debug(data);
		},
		error: function (xhr, e, t) {
			console.debug((xhr.responseText));
		},
		complete: function() {
			removerLoader();
		}
	});
}
// ALTERE PARA FUNCIONAR CORRETAMENTE
function LoadInfosUsuario() {
	var id = $('input[name="id_usuario_sessao"]').val();
	var hash_login = $('input[name="hash_usuario_sessao"]').val();
	$.ajax({
		method: "POST",
		async: true,
		data: {id: id, hash_login: hash_login},
		url: '/sistema/usuarios/ver/perfil/',
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			// MANIPULAR AS INFORMAÇÕES DO USUÁRIO
		},
		error: function(xhr) { // if error occured
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
		editable:true,
		eventClick: function(event, jsEvent, view) {
			$.ajax({
				method: "GET",
				async: true,
				url: '/sistema/agenda/editar/'+event.id,
				beforeSend: function(request) {
					console.log('setando');
					request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());					
					adicionarLoader();
				},
				success: function(data) {
					$('#modalinfo').find('.modal-content').html(data);
					$('#modalinfo').modal('open');
				},
				error: function(xhr) { // if error occured
					removerLoader();
				},
				complete: function() {
					removerLoader();
					FormatInputs();
				}
			});
		},eventDrop:function(event){
			$.ajax({
				method: "POST",
				async: true,
				data: {id: event.id, data_inicial: event.start.format('DD/MM/Y'),hora_inicial:event.start.format('HH:mm'),data_final:event.end.format('DD/MM/Y'),hora_final:event.end.format('HH:mm')},
				url: '/sistema/agenda/atualizar/',
				beforeSend: function(request) {
					request.setRequestHeader("Authority-Eagle-hash", $('input[name="hash_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Eagle-nivel", $('input[name="nivel_usuario_sessao"]').val());
					request.setRequestHeader("Authority-Eagle-id", $('input[name="id_usuario_sessao"]').val());
				},
				success: function(data) {
				},
				error: function(xhr) { // if error occured
					removerLoader();
				},
				complete: function() {
					removerLoader();
				}
			});
		}
		
	});
}