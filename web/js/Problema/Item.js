var React = require('react')

module.exports = React.createClass({
    verDetalles : function (evento) {
       this.props.handleVerDetalles(this.props.pos)
    },
    EliminarItem : function (evento) {
       this.props.handleEliminarItem(this.props.pos)
    },
    EditarItem : function (evento) {
       this.props.handleEditarItem(this.props.pos)
    },
    render: function () {
        return <div className="item">
               <li className="list-group-item titulo">
               <div className = "col-xs-3">
                  {this.props.titulo}
               </div>
               <span className="detalles">
               <a className="btn btn-danger" href="#" onClick={this.EliminarItem}> Eliminar</a>
               <a className="btn btn-warning" href="#" onClick={this.EditarItem}> Editar</a>
               <a className="btn btn-primary" href="#" onClick={this.verDetalles}> Detalles</a></span></li>
        </div>
    }
})

