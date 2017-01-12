var React = require('react')
var API = require('../servicios/APIProblema')
var EventBus = require('../servicios/EventBus')

module.exports = React.createClass({
    clickAddProblema: function () {
    	 var añadir = {
          titulo: this.campoTitulpro.value,
          descripcion: this.campoDescripPro.value,
          usuario: localStorage.email
        }
        API.crearProblema(añadir)
        EventBus.eventEmitter.emitEvent('refrescar', [añadir])
    },
    clickCloseProblema: function () {
      document.getElementById("newProblemComponente").className="hide";
      document.getElementById("newProblem").className="";
    },
    render: function () {
            return <div id="newProblemComponente" className="hide" >
		            	<h1>Nuevo item</h1>
			            <input id="titulpro" type="text" placeholder="Titulo" ref={(campo)=>{this.campoTitulpro=campo}}/> <br/>
			            <input id="descpro" type="text" placeholder="Descripcion"ref={(campo)=>{this.campoDescripPro=campo}}/> <br/>
			            <button onClick={this.clickAddProblema}>Añadir</button>
                  <button onClick={this.clickCloseProblema}>Cerrar</button>
		        	</div>
		        }
		})

