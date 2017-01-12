
module.exports  = {
    API_URL : 'http://localhost:3000/problemas?pagina=1&&cantidad=5',

    obtenerItemsProblemas: function () {
        return fetch(this.API_URL,{
          method: 'GET',
          headers: {
            'Authorization': localStorage.autenticador
          }
        }).then(function(response) {
                if (response.ok)
                    return response.json()
            })
    },
    eliminarProblema: function(id){
      var URL = 'http://localhost:3000/problemas/' + id
      return fetch(URL,{
          method: 'DELETE',
          headers: {
            'Authorization': localStorage.autenticador
          }
        }).then(function(response) {
                if (response.ok)
                    return response.json()
            })
    },
    editarProblema: function(item){
      var URL = 'http://localhost:3000/problemas/' + item.id
      return fetch(URL,{
          method: 'PUT',
          headers: {
            'Content-type':'application/json',
            'Authorization': localStorage.autenticador
          },
          body: JSON.stringify(item)
        }).then(function(response) {
                if (response.ok)
                    return response.json()
            })
    },
    /*cambiarPaginas: function(pagina){
      var newURL = 'http://localhost:3000/problemas?pagina=' + pagina.num  + '&&cantidad='+ pagina.cant
        return fetch(newURL,{
          method: 'GET',
          headers: {
            'Authorization': localStorage.autenticador
          }
        }).then(function(response) {
                if (response.ok){
                  return response.json()
                }else{
                  document.getElementById("MensajeApp").className="alert alert-warning"
                  document.getElementById("MensajeAppTexto").innerHTML="Pagina o cantidad de elementos no accesible"
                  return false
                }
                    
            })
    },*/obtenerItemsProblemasPaginado: function (pagina) {
        var newURL = 'http://localhost:3000/problemas?pagina=' + pagina.num  + '&&cantidad='+  pagina.cant
        return fetch(newURL,{
          method: 'GET',
          headers: {
            'Authorization': localStorage.autenticador
          }
        }).then(function(response) {
                if (response.ok){
                  return response.json()
                }
                else{
                  return false
                }
                    
            })
    },
    crearProblema: function (item) {
       var URL = 'http://localhost:3000/problemas/'
        return fetch(URL, {
                   method: 'POST',
                   headers: {
                       'Content-type':'application/json',
                       'Authorization': localStorage.autenticador
                   },
                   body: JSON.stringify(item)
               }).then(function (respuesta) {
                   if (respuesta.ok){
                      return respuesta.json()
                   }
               })
    }

}