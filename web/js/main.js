var React = require('react')
var ReactDOM = require('react-dom')


//var NuevoItem = require('./NuevoItem')
//ReactDOM.render(<NuevoItem/>,
//    document.getElementById('componenteNuevoItem'))


if(localStorage.email != null && localStorage.contraseña != null && localStorage != null){
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
	var ListaPreguntas = require('./Pregunta/Lista')
	ReactDOM.render(<ListaPreguntas/>,
	    document.getElementById('componenteListaPreguntas'))

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
