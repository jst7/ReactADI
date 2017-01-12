
module.exports  = {
    API_URL : 'http://localhost:3000/preguntas ',

    obtenerItemsPregunta: function () {
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
    eliminarPregunta: function(id){
      var URL = 'http://localhost:3000/preguntas/' + id
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
    editarPregunta: function(item){
      var URL = 'http://localhost:3000/preguntas/' + item.id
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
    }

}