var React = require('react')
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
           if(datos!=false)
            location.reload();
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