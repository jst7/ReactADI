var React = require('react')
var Item = require('./Item')
var DetallesItem = require('./DetallesItem')
var EditableItem = require('./EditableItem')
var API = require('../servicios/APIProblema')
var EventBus = require('../servicios/EventBus')


module.exports = React.createClass({
    componentDidMount: function () {
        //escuchamos el evento 'nuevoItem' en el bus de eventos
        //si se recibe el evento hay que añadir el item a la lista
        EventBus.eventEmitter.addListener('refrescar', this.refrescar)
        EventBus.eventEmitter.addListener('cambiarPag', this.paginas)

        this.numPagina.value = 1;
        this.cantidadPagina.value = 5;
        //le pedimos los items al API
        this.refrescarItems()
    },
    getInitialState : function () {
      return {items:[]}
    },
    refrescar: function (nuevo) {
      this.refrescarItems();
    },
    paginas: function (nuevo) {
      API.obtenerItemsProblemasPaginado(nuevo)
          .then(datos => {
              this.setState({items: datos})
            })
    },
    refrescarItems: function () {
        API.obtenerItemsProblemas()
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
    verEditable: function (i) {
       this.setState({editable:i})
    },
    ocultarEditable: function () {
       this.setState({editable:undefined})
    },
    eliminarItem: function (i) {
          API.eliminarProblema(this.state.items[0][0][i].id)
          var eliminado = {
           id: this.state.items[0][0][i].id
          }
          EventBus.eventEmitter.emitEvent('refrescar', [eliminado])
    },
    editarItem: function (i) {
        var editado = {
          id: this.state.items[0][0][i].id,
          titulo: this.state.items[0][0][i].titulo,
          descripcion: document.getElementById("editableDescripcion").value
        }
        API.editarProblema(editado)
        EventBus.eventEmitter.emitEvent('refrescar', [editado])
    },    
    clickPaginacion: function () {
      var pagina = {
          num: this.numPagina.value,
          cant: this.cantidadPagina.value
        }

        API.cambiarPaginas(pagina)
        EventBus.eventEmitter.emitEvent('cambiarPag', [pagina])
    },    
    clickSiguiente: function () {
      if(0 == this.numPagina.value){

      }else{
        this.numPagina.value = parseInt(this.numPagina.value) + 1
        this.clickPaginacion()
      }
    },    
    clickAnterior: function () {
      if(parseInt(this.numPagina.value)==1){

      }else{
        this.numPagina.value = this.numPagina.value - 1
        this.clickPaginacion()
      }
      
    },
    clickNuevoProblema: function () {
      document.getElementById("newProblemComponente").className="";
      document.getElementById("newProblem").className="hide";
    },
    render: function () {
        var prods = []

        for (var i=0; i<this.state.items.length-1; i++) {
            
            var total = this.state.items[0][0]
            var anterior = this.state.items[0][1][0].anterior;
            var siguiente = this.state.items[0][1][0].siguiente;
            var ultima = this.state.items[0][1][0].última;

            for(var j=0; j<total.length; j++){
                var ahora = total[j]

                var elemento
                if (this.state.editable==j ) {
                    elemento = <EditableItem key={j}
                                         pos={j}
                                         titulo={ahora.titulo}
                                         descripcion={ahora.descripcion}
                                         usuario={ahora.usuario}
                                         handleOcultarEditable={this.ocultarEditable}
                                         handleEditarEditable={this.editarItem}/>
                }
                else if (this.state.detalle==j ) {
                    elemento = <DetallesItem key={j}
                                         pos={j}
                                         titulo={ahora.titulo}
                                         descripcion={ahora.descripcion}
                                         usuario={ahora.usuario}
                                         handleOcultarDetalles={this.ocultarDetalles}/>
                }
                else {
                    elemento = <Item key={j}
                                     pos={j}
                                     titulo={ahora.titulo}
                                     handleVerDetalles={this.verDetalles}
                                     handleEliminarItem={this.eliminarItem}
                                     handleEditarItem={this.verEditable}
                                    />
                    }
                prods.push(elemento)
            }
        }
        return <div id="lista">
                  <h1>Problema</h1>
                  <div id="newProblem"><a  className="btn btn-default" onClick={this.clickNuevoProblema}> Añadir Problema</a></div>
                  <div id="zonaDeCambio">
                  <div className="list-group">
                    {prods}
                  </div>
                  <div>
                    <div className="col-xs-12">
                      <div className="col-xs-4">
                        <fieldset disabled>
                          <input size="2" id="numeroPagina" placeholder="pagina" ref={(campo)=>{this.numPagina=campo}}></input>
                        </fieldset>
                      </div>
                      <div className="col-xs-8">
                        Por página: 
                        <input size="2" id="cantidadPagina" placeholder="Cantidad" ref={(campo)=>{this.cantidadPagina=campo}}></input>
                        <a className="btn btn-danger" onClick={this.clickPaginacion}>Ir</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="col-xs-4">
                      Anterior: {anterior} 
                    </div>
                   <div className="col-xs-4">
                      Siguiente: {siguiente} 
                    </div>
                    <div className="col-xs-2">
                      Ultima:
                    </div>
                   <div className="col-xs-2">
                      <p id="ultimaPagina"> {ultima}  </p>
                    </div>                     
                  </div>
                  </div>
                  <a className="btn btn-warning" onClick={this.clickAnterior} >Anterior</a>
                  <a className="btn btn-primary" onClick={this.clickSiguiente} >Siguiente</a>
               </div>
    }
})
