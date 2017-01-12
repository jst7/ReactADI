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

app.get('*', function(pet, resp){
    resp.send('Práctica REACT')
})

//PUERTO
app.listen(process.env.PORT || 3000, function(){
    console.log('Express en el puerto 3000');
})