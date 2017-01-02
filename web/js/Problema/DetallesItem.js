var React = require('react')

module.exports = React.createClass({
    ocultarDetalles: function () {
      this.props.handleOcultarDetalles(this.props.pos)
    },
    render: function () {
        return <div className="detallesItem">
              <li className="list-group-item list-group-item-action list-group-item-success titulo"><h3>Titulo: {this.props.titulo}</h3>
              <div className="descripcion"> <h3>Descripción: {this.props.descripcion}</h3></div>
              <div className="usuario"><h3>Usuario: {this.props.usuario} </h3></div>
              <a className="btn btn-primary" href="#" onClick={this.ocultarDetalles}>Ocultar detalles</a></li>
            </div>
    }
})