var express = require('express')
var bodyParser = require('body-parser')
require('./aux')();

var app = express()
app.use(bodyParser());

app.use('/web', express.static('web'))

//RUTAS de ARCHIVOS 
var usuarios = require('./routes/Usuario')
app.use('/usuarios',usuarios)

var problemas = require('./routes/Problema')
app.use('/problemas',problemas)

var preguntas = require('./routes/Pregunta')
app.use('/preguntas',preguntas)

var solucion = require('./routes/Solucion')
app.use('/solucion',solucion)

app.get('/deletebd',autenticaBasic,function(req,res){
    connect().query('CALL vaciar();', function(err, rows, fields) {
        res.status(200).send("Base de datos Respuesta a 0 y rellenada")
    });
});




var lista = new Map()
lista.set(1, {id:1, nombre:"patatas", cantidad:"1 bolsa", email:"hola", comentario: "No de las fritas, de las crudas!!"})
lista.set(2, {id:2, nombre:"cerveza", cantidad:"6 botes", email:"hola", comentario: "No hace falta regatear: Steinburg"})
var idActual = 3;


app.get('/api/items', function(pet, resp){
    var array = [];
    lista.forEach(function(valor){
        array.push(valor)
    })
    resp.send(array)
})

app.get('/usuarioss',function(req,res,next){

    var consulta = 'select * from Usuario'

    connect().query(consulta, function(err, rows, fields) {
      if (err || rows.length==0){
        if(rows.length==0){
          res.status(500).send('Error')
        }else{
          res.status(400).send('No tiene Usuario')
        }
      }else{
        res.status(200).send(rows)
      }
  });
});

app.get('/api/items/:id', function(pet,resp){
    var id = parseInt(pet.params.id)
    if (isNaN(id)) {
        resp.status(400);
        resp.end();
    }
    else {
        var item = lista.get(id)
        if (item==undefined) {
            resp.status(404)
            resp.send('No existe el item con id ' + id);
        }
        else
            resp.send(item);
    }
})

//para probar con curl
//curl -d '{"nombre":"tomates","cantidad":1, "comentario":"mejor de rama"}' -H "Content-Type:application/json" -v http://localhost:3000/api/items
app.post('/api/items', function(pet, resp) {
    var nuevo = pet.body
    if (nuevo.nombre && nuevo.cantidad) {
        var creado = {id: idActual,
             nombre:nuevo.nombre,
             cantidad: nuevo.cantidad,
             comentario: nuevo.comentario
        }
        lista.set(idActual,creado)
        idActual++
        resp.status(201)
        //Fundamentalismo REST
        resp.header('Location','http://localhost:3000/api/items/'+creado.id)
        //En la práctica muchos APIs devuelven el objeto creado, incluyendo id
        resp.send(creado)
    }
    else {
        resp.status(400)
        resp.send("el objeto no tiene los campos adecuados")
    }
})

//Podéis probar esto con
//curl -X DELETE -v http://localhost:3000/api/items/1
app.delete('/api/items/:id', function(pet, resp){
    var id = parseInt(pet.params.id)
    if (isNaN(id)) {
        resp.status(400);
        resp.end();
    }
    else {
        var item = lista.get(id)
        if (item==undefined) {
            resp.status(404)
            resp.send('No existe el item con id ' + id);
        }
        else{
            lista.delete(id);
            resp.end();
        }
    }
})

app.get('*', function(pet, resp){
    resp.send('Hola soy express que tal')
})

//PUERTO
app.listen(process.env.PORT || 3000, function(){
    console.log('Express en el puerto 3000');
})