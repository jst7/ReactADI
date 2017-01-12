var React = require('react')
var ReactDOM = require('react-dom')

var APILista = require('./servicios/APIPregunta.js')
var handlebars = require('handlebars')

var templateItem = `
   <div>
      <div class="list-group-item" id="{{id}}">
      	<div class="col-xs-8">
         {{Problema}} 
      	</div>
      <a class="btn btn-primary" id="venlace_{{id}}" href="javascript:verDetalles({{id}})">Detalles</a>
      </div>   
   </div>
`
var templateLista = `
 <h1>Preguntas</h1>
 {{#.}}
   ${templateItem}
 {{/.}}
` 
var templateDetalles = `
  <div id="odetalles_{{id}}">
   	<h3>Descripción: {{descripcion}}</h3> <h3>Usuario: {{usuario}}</h3>
  	<a class="btn btn-primary" id="oenlace_{{id}}" href="javascript:javascript:ocultarDetalles({{id}})">Ocultar Detalles</a>
  </div>
`
var tmpl_lista_compilada = handlebars.compile(templateLista)
var tmpl_item_compilada = handlebars.compile(templateItem)
var tmpl_detalles_compilada = handlebars.compile(templateDetalles)

function verDetalles(id) {
	APILista.obtenerItemsPregunta(id).then(function(item){
		var it = item[0][0][id];
		var datos = {id: id, descripcion: it.descripcion, usuario: it.usuario}
		var datosHTML = tmpl_detalles_compilada(datos)
		var divItem = document.getElementById(id)
		divItem.insertAdjacentHTML('beforeend', datosHTML)	
		var enlaceDetalles = document.getElementById('venlace_'+id)
		enlaceDetalles.className="hide";
	})
}
window.verDetalles = verDetalles

function ocultarDetalles(id) {
	var enlaceDetalles = document.getElementById('venlace_'+id)
	enlaceDetalles.className="btn btn-primary";
	document.getElementById('odetalles_'+ id).outerHTML = ''
	document.getElementById('oenlace_'+id).href = 'javascript:verDetalles('+id+')'
	document.getElementById('enlace_'+id).innerHTML = 'Detalles'
}
window.ocultarDetalles = ocultarDetalles


if(localStorage.email != null && localStorage.contraseña != null && localStorage.autenticador != null){
	//LOGOUT
	var LogoutUSuario = require('./Login/Logout')
	ReactDOM.render(<LogoutUSuario/>,
    document.getElementById('logout'))
	//USUARIO
	var ListaUsuarios = require('./Usuarios/Lista')
	ReactDOM.render(<ListaUsuarios/>,
	    document.getElementById('componenteListaUsuarios'))

	//PROBLEMA
	var ListaProblemas = require('./Problema/Lista')
	ReactDOM.render(<ListaProblemas/>,
	    document.getElementById('componenteListaProblemas'))
	
	var CrearProbl= require('./Problema/CrearProblema')
	ReactDOM.render(<CrearProbl/>,
	    document.getElementById('componenteCrearProblema'))

	//PREGUNTA
	//var ListaPreguntas = require('./Pregunta/Lista')
	//ReactDOM.render(<ListaPreguntas/>,
	//    document.getElementById('componenteListaPreguntas'))
	document.addEventListener('DOMContentLoaded', function(){
	APILista.obtenerItemsPregunta().then(function(datos) {
		var listaHTML = tmpl_lista_compilada(datos[0][0])
		document.getElementById("miComponente").innerHTML = listaHTML
	})
	})

	//SOLUCION
	var ListaSolucion = require('./Solucion/Lista')
	ReactDOM.render(<ListaSolucion/>,
	    document.getElementById('componenteListaSolucion'))
}
else{
	//LOGIN
	var LoginUSuario = require('./Login/Login')
	ReactDOM.render(<LoginUSuario/>,
    document.getElementById('loginUsuario'))
}
