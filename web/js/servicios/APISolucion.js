
module.exports  = {
    API_URL : 'http://localhost:3000/solucion',

    obtenerItemsSolucion: function () {
        return fetch(this.API_URL,{
          method: 'GET',
          headers: {
            'Authorization': localStorage.autenticador
          }
        }).then(function(response) {
                if (response.ok)
                    return response.json()
            })
    }
}