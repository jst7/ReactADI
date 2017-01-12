var React = require('react')
var ReactDOM = require('react-dom')
var API = require('../servicios/APILogin')
var EventBus = require('../servicios/EventBus')


module.exports = React.createClass({
    click: function () {
       var entra = {
           email: this.campoEmail.value,
           contraseña: this.campoContraseña.value
       }
       API.login(entra).then(function(datos){
           EventBus.eventEmitter.emitEvent('entra', [entra])
           if(datos!=false){

              document.getElementById("loginUsuario").innerHTML="";

              //LOGOUT
              var LogoutUSuario = require('../Login/Logout')
              ReactDOM.render(<LogoutUSuario/>,
                document.getElementById('logout'))
              //USUARIO
              var ListaUsuarios = require('../Usuarios/Lista')
              ReactDOM.render(<ListaUsuarios/>,
                  document.getElementById('componenteListaUsuarios'))
              //PROBLEMA
              var ListaProblemas = require('../Problema/Lista')
              ReactDOM.render(<ListaProblemas/>,
                  document.getElementById('componenteListaProblemas'))
              
              var CrearProbl= require('../Problema/CrearProblema')
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
              var ListaSolucion = require('../Solucion/Lista')
              ReactDOM.render(<ListaSolucion/>,
                  document.getElementById('componenteListaSolucion'))


            }
       })
    },
    render: function () {
        return <div>
            <h1>Login</h1>
            <input type="text" placeholder="Usuario" 
                ref={(campo)=>{this.campoEmail=campo}}/> <br/>
            <input type="password" placeholder="Contraseña"
                ref={(campo)=>{this.campoContraseña=campo}}/> <br/>
            <button onClick={this.click}>Entrar</button>
        </div>
    }   
})