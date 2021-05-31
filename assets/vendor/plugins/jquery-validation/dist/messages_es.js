/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ES (Spanish; Español)
 */
$.extend( $.validator.messages, {
	required: '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Información obligatoria.',
	remote: '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Favor de rellena este campo.',
	email: '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Ingresa una dirección de correo electrónico válida.',
	url: '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Favor de escribir una URL válida.',
	date: '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Favor de escribir una fecha válida.',
	dateISO: "Por favor, escribe una fecha (ISO) válida.",
	number: "Por favor, escribe un número válido.",
	digits: "Por favor, escribe sólo dígitos.",
	creditcard: "Por favor, escribe un número de tarjeta válido.",
	equalTo: "Por favor, escribe el mismo valor de nuevo.",
	extension: "Por favor, escribe un valor con una extensión aceptada.",
	maxlength: $.validator.format( '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Favor de no escribir más de {0} caracteres.' ),
	minlength: $.validator.format( '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Favor de no escribir menos de {0} caracteres.' ),
	rangelength: $.validator.format( '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Favor de escribir un valor entre {0} y {1} caracteres.' ),
	range: $.validator.format( "Por favor, escribe un valor entre {0} y {1}." ),
	max: $.validator.format( "Por favor, escribe un valor menor o igual a {0}." ),
	min: $.validator.format( "Por favor, escribe un valor mayor o igual a {0}." ),
	// max: $.validator.format( "Por favor, escribe un valor menor o igual a la fecha actual." ),
	// min: $.validator.format( "Por favor, escribe un valor mayor o igual a la fecha actual." ),
	nifES: "Por favor, escribe un NIF válido.",
	nieES: "Por favor, escribe un NIE válido.",
	cifES: "Por favor, escribe un CIF válido."
} );
