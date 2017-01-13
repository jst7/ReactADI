var React = require('react')
var ReactDOM = require('react-dom')
var API = require('../servicios/APILogin')
var APILista = require('../servicios/APIPregunta.js')
var EventBus = require('../servicios/EventBus')
var handlebars = require('handlebars')

module.exports = React.createClass({
    click: function () {
       var entra = {
           email: this.campoEmail.value,
           contraseña: this.campoContraseña.value
       }
       API.login(entra).then(function(datos){

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

          var tmpl_lista_compilada = handlebars.compile(templateLista)


           if(datos!=false){

              document.getElementById("loginUsuario").className="hide";

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

              APILista.obtenerItemsPregunta().then(function(datos) {
                var listaHTML = tmpl_lista_compilada(datos[0][0])
                document.getElementById("miComponente").innerHTML = listaHTML
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