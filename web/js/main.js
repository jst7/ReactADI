var React = require('react')
var ReactDOM = require('react-dom')

var APILista = require('./servicios/APIPregunta.js')
var handlebars = require('handlebars')

var templateItem = `
   <div>
      <div class="list-group-item" id="{{id}}">
      	<div class="col-xs-3">
         {{Problema}} 
      	</div>
      <a class="btn btn-danger" id="Delenlace_{{id}}" href="javascript:delPregunta({{id}})">Eliminar</a>
      <a class="btn btn-warning" id="Editenlace_{{id}}" href="javascript:verEditable({{id}})">Editar</a>
      <a class="btn btn-primary" id="venlace_{{id}}" href="javascript:verDetalles({{id}})">Detalles</a>
      </div>   
   </div>
`
var templateLista = `
 <h1>Preguntas</h1>
 <a class="btn btn-default"> Añadir Pregunta </a> 
 <div id="listaPreguntaCon">
 {{#.}}
   ${templateItem}
 {{/.}}
 </div>
`
var templateListaSola = ` 
{{#.}}
   ${templateItem}
 {{/.}}`

var templateDetalles = `
  <div id="odetalles_{{id}}">
   	<h3>Descripción: {{descripcion}}</h3> <h3>Usuario: {{usuario}}</h3>
  	<a class="btn btn-primary" id="oenlace_{{id}}" href="javascript:javascript:ocultarDetalles({{id}})">Ocultar Detalles</a>
  </div>
`
var templateEdita = `
  <div id="oeditable_{{id}}">
   	<h3>Descripción: {{descripcion}}</h3><input id="editaPreguntaInput_{{id}}" type="text" placeholder="Descripcion"> </input> <h3>Usuario: {{usuario}}</h3>
  	<a class="btn btn-warning" id="enlace_Edit_{{id}}" href="javascript:javascript:editPregunta({{id}})">Edita</a>
  	<a class="btn btn-primary" id="ocu_enlace_Edit_{{id}}" href="javascript:javascript:ocultarEdit({{id}})">Ocultar</a>
  </div>
`

var tmpl_lista_compilada = handlebars.compile(templateLista)
var tmpl_lista_compilada_sola = handlebars.compile(templateListaSola)
var tmpl_item_compilada = handlebars.compile(templateItem)
var tmpl_detalles_compilada = handlebars.compile(templateDetalles)
var tmpl_edita_compilada = handlebars.compile(templateEdita)

function pregunta(){
	APILista.obtenerItemsPregunta().then(function(datos) {
    var listaHTML = tmpl_lista_compilada(datos[0][0])
    document.getElementById("miComponente").innerHTML = listaHTML
    })
}

function delPregunta(id) {
	APILista.eliminarPregunta(id).then(function(item){
			APILista.obtenerItemsPregunta().then(function(datos) {
				var listaHTML = tmpl_lista_compilada_sola(datos[0][0])
				document.getElementById("listaPreguntaCon").innerHTML = listaHTML
	})
		document.getElementById("MensajeApp").className="alert alert-warning"
        document.getElementById("MensajeAppTexto").innerHTML="elemento Eliminado"
	})
}
window.delPregunta = delPregunta

function editPregunta(ide) {
	      var it = {
		      id: ide,
	          descripcion: document.getElementById("editaPreguntaInput_"+ide).value
          }
	APILista.editarPregunta(it).then(function(item){
			APILista.obtenerItemsPregunta().then(function(datos) {
				var listaHTML = tmpl_lista_compilada_sola(datos[0][0])
				document.getElementById("listaPreguntaCon").innerHTML = listaHTML
	})
		document.getElementById("MensajeApp").className="alert alert-warning"
        document.getElementById("MensajeAppTexto").innerHTML="elemento editado"
	})
}
window.editPregunta = editPregunta

function verDetalles(id) {
	APILista.obtenerItemsPregunta(id).then(function(item){
		var elemento
		for(var i = 0; i<item[0][0].length; i++){
			if(item[0][0][i].id==id){
				elemento = item[0][0][i]
			}
		}
		var it = elemento;
		var datos = {id: id, descripcion: it.descripcion, usuario: it.usuario}
		var datosHTML = tmpl_detalles_compilada(datos)
		var divItem = document.getElementById(id)
		divItem.insertAdjacentHTML('beforeend', datosHTML)	

		document.getElementById('Delenlace_'+id).className="hide";
		document.getElementById('venlace_'+id).className="hide";	
		document.getElementById('Editenlace_'+id).className="hide";
	})
}
window.verDetalles = verDetalles

function verEditable(id) {
	APILista.obtenerItemsPregunta(id).then(function(item){
		var elemento
		for(var i = 0; i<item[0][0].length; i++){
			if(item[0][0][i].id==id){
				elemento = item[0][0][i]
			}
		}
		var it = elemento;
		var datos = {id: id, descripcion: it.descripcion, usuario: it.usuario}
		var datosHTML = tmpl_edita_compilada(datos)
		var divItem = document.getElementById(id)
		divItem.insertAdjacentHTML('beforeend', datosHTML)

		document.getElementById('Delenlace_'+id).className="hide";
		document.getElementById('venlace_'+id).className="hide";	
		document.getElementById('Editenlace_'+id).className="hide";
	})
}
window.verEditable = verEditable

function ocultarDetalles(id) {
	document.getElementById('venlace_'+id).className="btn btn-primary";
	document.getElementById('Delenlace_'+id).className="btn btn-danger";
	document.getElementById('Editenlace_'+id).className="btn btn-warning";
	
	document.getElementById('odetalles_'+ id).outerHTML = ''
}
window.ocultarDetalles = ocultarDetalles

function ocultarEdit(id) {
	document.getElementById('venlace_'+id).className="btn btn-primary";
	document.getElementById('Delenlace_'+id).className="btn btn-danger";
	document.getElementById('Editenlace_'+id).className="btn btn-warning";
	
	document.getElementById('oeditable_'+ id).outerHTML = ''
}
window.ocultarEdit = ocultarEdit


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
