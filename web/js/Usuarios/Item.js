var React = require('react')

module.exports = React.createClass({
    verDetalles : function (evento) {
       this.props.handleVerDetalles(this.props.pos)
    },
    render: function () {
    	if(localStorage.email == this.props.email)
    		return <li className="list-group-item list-group-item-action list-group-item-success"> <div> YO: {this.props.email} </div>  <div> NOMBRE: {this.props.nombre}</div> </li>
    	else
    		return <li className="list-group-item nombre "> {this.props.email}</li>
        
        
    }
})

