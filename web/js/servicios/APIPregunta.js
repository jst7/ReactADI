
module.exports  = {
    API_URL : 'http://localhost:3000/preguntas',

    obtenerItemsPregunta: function () {
        return fetch(this.API_URL,{
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + new Buffer("usuario:123456").toString('base64')
          }
        }).then(function(response) {
                if (response.ok)
                    return response.json()
            })
    },

    addItem: function (item) {
        return fetch(this.API_URL, {
                   method: 'POST',
                   headers: {
                       'Content-type':'application/json',
                       'Authorization': 'Basic ' + new Buffer("usuario:123456").toString('base64')
                   },
                   body: JSON.stringify(item)
               }).then(function (respuesta) {
                   if (respuesta.ok)
                      return respuesta.json()
               })
    }

}