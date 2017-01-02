var React = require('react')

module.exports = React.createClass({
    ocultarEditable: function () {
      console.log(this.props);
      this.props.handleOcultarEditable(this.props.pos)
    },
    editarProblema: function () {
      this.props.handleEditarEditable(this.props.pos)
    },
    render: function () {
        return <div className="detallesItem">
              <li className="list-group-item list-group-item-action list-group-item-warning titulo"><h3>Titulo: {this.props.titulo}</h3>
              <div className="descripcion"> <h3>Descripción: {this.props.descripcion}</h3> <input id="editableDescripcion" type="text" name="descripcion" placeholder="Editar descripción"></input> </div>
              <div className="usuario"><h3>Usuario:{this.props.usuario}</h3> </div>
              <a className="btn btn-warning" href="#" onClick={this.editarProblema}>Editar</a>
              <a className="btn btn-primary" href="#" onClick={this.ocultarEditable}>Ocultar Editable</a></li>
            </div>
    }
})