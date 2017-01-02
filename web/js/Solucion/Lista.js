var React = require('react')
var Item = require('./Item')
var DetallesItem = require('./DetallesItem')
var API = require('../servicios/APISolucion')
var EventBus = require('../servicios/EventBus')


module.exports = React.createClass({
    componentDidMount: function () {
        //escuchamos el evento 'nuevoItem' en el bus de eventos
        //si se recibe el evento hay que añadir el item a la lista
        EventBus.eventEmitter.addListener('nuevoItem', this.addItem)
        //le pedimos los items al API
        this.refrescarItems()
    },
    getInitialState : function () {
      return {items:[]}
    },
    addItem: function (nuevo) {
      var items = this.state.items
      items.push(nuevo)
      this.setState({items: items, detalle:undefined})
    },
    refrescarItems: function () {
        API.obtenerItemsSolucion()
            .then(datos => {
                this.setState({items: datos})
            })
    },
    verDetalles: function (i) {
       this.setState({detalle:i})
    },
    ocultarDetalles: function () {
       this.setState({detalle:undefined})
    },
    render: function () {
        var prods = []
        for (var i=0; i<this.state.items.length-1; i++) {
            
            var total = this.state.items[0][0]
            for(var j=0; j<total.length; j++){
                var ahora = total[j]

                var elemento
                if (this.state.detalle==j) {
                    elemento = <DetallesItem key={j}
                                         pos={j}
                                         solucion={ahora.solucion}
                                         Pregunta={ahora.Pregunta}
                                         usuario={ahora.usuario}
                                         votos={ahora.votos}
                                         handleOcultarDetalles={this.ocultarDetalles}/>
                }
                else {
                    elemento = <Item key={j}
                                     pos={j}
                                     solucion={ahora.solucion}
                                     handleVerDetalles={this.verDetalles}/>
                    }
                prods.push(elemento)

            }
        }
        return <div id="lista">
                  <h1>Solucion</h1>
                 <div className="list-group">
                  {prods}
                  </div>
               </div>
    }
})
