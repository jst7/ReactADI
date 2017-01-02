var React = require('react')

module.exports = React.createClass({
    ocultarDetalles: function () {
      this.props.handleOcultarDetalles(this.props.pos)
    },
    render: function () {
        return <div className="list-group-item list-group-item-action list-group-item-success">
              <div><span className="descripcion">Descripción: {this.props.descripcion}</span></div>
              <div><span className="Problema">Problema: {this.props.Problema}</span></div>
              <div><div className="usuario">Usuario: {this.props.usuario}</div></div>
              <a className="btn btn-primary" href="#" onClick={this.ocultarDetalles}>Ocultar Detalles</a>
            </div>
    }
})