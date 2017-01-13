var mysql   = require('mysql');
var jwt   = require('jwt-simple');


module.exports = function() { 

    this.connect = function() { 
    	var result 	=  mysql.createConnection({
					  host     : 'localhost',
					  user     : 'root',
					  password : 'mads',
					  database : 'ADI_Prac'
					})

		return result
	}

	this.autenticaBasic = function(pet, res, next) {
  		var auth  = pet.get('Authorization')
  		var secret  = 'Basic ' + new Buffer("usuario:123456").toString('base64')

  		if (auth == null) {
   			res.status(401).set('WWW-Authenticate', 'Basic realm="myrealm"')
   			return res.send("No autorizado.")
  		}else if (auth != secret) {
   			return res.status(403).send("Error en user/pass. No autorizado.")
  		}else{
  			next()
  		}
  		
 		}

 	this.Hipermedia = function(sol, tipo) {

 		if(tipo == 1){
 			return [sol, [{rel: "usuarios",
	                tipo: "GET",
	                href: "/usuarios?pagina=1"},
	                {rel: "usuarios id",
	                tipo: "GET",
	                href: "/usuarios/id"},
	                {rel: "usuario registrar",
	                tipo: "POST (JSON CAMPOS (nombre,contraseña,email))",
	                href: "/usuarios/"},
	                {rel: "usuario Buscar",
	                tipo: "GET",
	                href: "/usuarios/nombre/:nombre"},
	                {rel: "usuario borrar",
	                tipo: "DELETE",
	                href: "/usuarios/id"},
	                {rel: "usuario autentificar",
	                tipo: "POST (JSON CAMPOS (contraseña,email))",
	                href: "/usuarios/autentificar"},
	                {rel: "usuario modificar",
	                tipo: "PUT (JSON CAMPOS (nombre,contraseña,email))",
	                href: "/usuarios/id"}
               		]
         		]

 		}else if(tipo == 2){
 			return [sol, [{rel: "problemas",
		            tipo: "GET",
		            href: "/problemas?pagina=1"},
		            {rel: "problemas id",
		            tipo: "GET",
		            href: "/problemas/id"},
		            {rel: "problemas registrar",
		            tipo: "POST (JSON CAMPOS (usuario,titulo,descripcion))",
		            href: "/problemas/"},
			        {rel: "problemas borrar",
		            tipo: "DELETE",
		            href: "/problemas/id"},
		            {rel: "problemas modificar",
		            tipo: "PUT (JSON CAMPOS (titulo,descripcion))",
		            href: "/problemas/id"}
		            ]
          		]

 		}else if(tipo == 3){
 			return [sol, [{rel: "pregunta",
		            tipo: "GET",
		            href: "/"},
		            {rel: "pregunta id",
		            tipo: "GET",
		            href: "/id"},
		            {rel: "pregunta registrar",
		            tipo: "POST (JSON CAMPOS (tema,descripcion))",
		            href: "/registrar"},
		            {rel: "pregunta borrar",
		            tipo: "DELETE",
		            href: "/borrar/id"},
		            {rel: "pregunta modificar",
		            tipo: "PUT (JSON CAMPOS (descripcion))",
		            href: "/modificar/id"}
		            ]
          		]
 			}else if(tipo == 4){
 			return [sol, [{rel: "solucion",
		            tipo: "GET",
		            href: "/"},
		            {rel: "solucion id",
		            tipo: "GET",
		            href: "/solucion/id"},
		            {rel: "solucion registrar",
		            tipo: "POST (JSON CAMPOS (pregunta,solucion,usuario,votos))",
		            href: "/solucion/"},
		            {rel: "solucion borrar",
		            tipo: "DELETE",
		            href: "/solucion/id"},
		            {rel: "solucion modificar",
		            tipo: "PUT (JSON CAMPOS (solucion))",
		            href: "/solucion/id"},
		            {rel: "Obtener la pregunta de una solucion",
		            tipo: "GET ",
		            href: "/solucion/pregunta/:pregunta/:problema"}
		            ]
          		]
 			}
 		}

 	this.GenerarToken = function(cad) {
		var token = ''
		var secret = 'Jst*Jqa#2701';
		var pass64 = new Buffer(secret).toString('base64') 
		var token = jwt.encode(cad, pass64);
				  
  	return token
 	}

 	this.ComprobarToken = function(cad) {
		var token = ''
		var secret = 'Jst*Jqa#2701';
		var pass64 = new Buffer(secret).toString('base64') 
		var token = jwt.decode(cad, pass64);
				  
  	return token
  }

  this.paginacion = function(pet, rows){
  	var pagina =pet.query.pagina
  	var consulta=''
  	var cantidad = pet.query.cantidad

  	if(pagina != undefined && pagina > 0 && cantidad != undefined && cantidad > 0){
  		consulta = ' LIMIT ' + ((pagina*cantidad) - cantidad) + ', ' + cantidad
  	}

  	else if(pagina != undefined && pagina > 0){
  		consulta = ' LIMIT ' + ((pagina*cantidad) - cantidad) + ', ' + rows
  	}

  	return consulta;
  }

  this.paginas_paginacion=function(esqueleto, req, ultima){
  	var posicion = req.query.pagina
  	var itemPag = req.query. cantidad
  	
  	var antes = posicion;
  	if(antes>1){
  		antes=antes-1;
  	}

  	var last= ultima/itemPag;

  	if(ultima%itemPag!=0){
  		last=parseInt(last.toFixed())+1;

  	}else if(ultima<itemPag){
  		last=1
  	}

  	var siguiente = posicion;
  	if(siguiente!=last && siguiente < last){
  		siguiente=parseInt(siguiente)+1;
  	}

  	var salida = [{ anterior: + antes,
                    siguiente: + siguiente,
                    última: + last
                    }]
    return salida;
  }

  this.ultimaPosicion = function(esqueleto, callback){

  	var fin=0;
 	connect().query("SELECT count(*) as total FROM " + esqueleto, function(err, result ){
  		
 		if(err){
 			callback(err,null);
 		}
 		else{
 			callback(null,result[0].total);
 		}
  		
  	});
  }
  this.itemPorPagina=5;
 	
}

