
module.exports  = {
    API_URL : 'http://localhost:3000/usuarios/autentificar',
    login: function (item) {
        return fetch(this.API_URL, {
                   method: 'POST',
                   headers: {
                       'Content-type':'application/json',
                   },
                   body: JSON.stringify(item)
               }).then(function (respuesta) {
                   if (respuesta.ok){
                      localStorage.setItem("email",item.email);
                      localStorage.setItem("contraseña",item.contraseña);
                      localStorage.setItem("autenticador", 'Basic ' + new Buffer("usuario:123456").toString('base64'));
                      return respuesta.json()
                  }else{
                    document.getElementById("MensajeApp").className="alert alert-warning"
                    document.getElementById("MensajeApp").innerHTML="Login Incorrecto"
                    return false
                  }
               })
    }

}
