var React = require('react')

module.exports = React.createClass({
    ocultarDetalles: function () {
      this.props.handleOcultarDetalles(this.props.pos)
    },
    render: function () {
        return <div className="list-group-item list-group-item-action list-group-item-success">
              <span className="solucion">{this.props.solucion}</span>&nbsp;-&nbsp;
              <span className="Pregunta">{this.props.pregunta}</span>
              <div className="usuario">{this.props.usuario}</div>
              <div className="votos">{this.props.votos}</div>
              <a className="btn btn-primary" href="#" onClick={this.ocultarDetalles}>Ocultar Detalles</a>
            </div>
    }
})