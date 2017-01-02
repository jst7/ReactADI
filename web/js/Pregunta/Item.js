var React = require('react')

module.exports = React.createClass({
    verDetalles : function (evento) {
       this.props.handleVerDetalles(this.props.pos)
    },
    render: function () {
        return <div className="item list-group-item">
               <span className="descripcion">{this.props.descripcion}</span>&nbsp;
               <a className="btn btn-primary" href="#" onClick={this.verDetalles}> Detalles</a>
        </div>
    }
})

