var React = require('react')


module.exports = React.createClass({
    click: function () {
       localStorage.clear();
       location.reload();
    },
    render: function () {
    	document.getElementById("UsuarioAplicacion").innerHTML=localStorage.email
        return  <a className="btn btn-danger" onClick={this.click}><span className="bg-primary"> Cerrar Sesion</span></a>
    }   
})