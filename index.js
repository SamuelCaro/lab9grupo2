'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "inventariotest"
});

conn.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Conexión exitosa a base de datos");
    }
});

app.post("/centrosPoblados/create", function (request, response) {
    var nombre = request.body.nombreCentroPoblado;
    var ubigeo = request.body.ubigeo;
    console.log("aaaaaaaaaaa");
    //response.send(`Nombre: ${nombre} | Apellido: ${apellido}`);
    var sql = "INSERT INTO inventariotest.centrospoblados (nombreCentroPoblado, ubigeo) VALUES (?, ?)";
    var parametros = [nombre, ubigeo];
    conn.query(sql, parametros, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });

});

app.listen(3000, function () {
    console.log("servidor levantado exitosamente");
});

//localhost:3000/centrosPoblados/update
/* Parámetros:
* idCentroPoblado Integer
* nombreCentroPoblado String
* ubigeo Integer
*  */
app.post("/centrosPoblados/update", function (request, response) {
    var idCentroPoblado = request.body.idCentroPoblado;
    var nombreCentroPoblado = request.body.nombreCentroPoblado;
    var ubigeo = request.body.ubigeo;
 ////AQUI QUERY
var variablesql = "INSERT INTO `inventariotest`.`centrospoblados` (`idCentroPoblado`, `nombreCentroPoblado`, `ubigeo`) VALUES (?, ?, ?)";
var parametros = [idCentroPoblado,nombreCentroPoblado ,ubigeo];
    conn.query(variablesql, parametros, function (err, jsonRespuesta) {
        if (err) {
            console.log(err);
        } else {
            var jsonRespuesta = {
                estado: "OK",
                datos: {
                    "idCentroPoblado": idCentroPoblado,
                    "nombreCentroPoblado": nombreCentroPoblado,
                    "ubigeo": ubigeo
                }
            };
            response.json(jsonRespuesta);
        }
    });


//response.send (`idCentropoblado: ${idCentroPoblado} | nombreCentroPoblado: ${nombreCentroPoblado} | ubigeo:${ubigeo}`);



});

