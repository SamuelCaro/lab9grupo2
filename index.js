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

//response.send (`idCentropoblado: ${idCentroPoblado} | nombreCentroPoblado: ${nombreCentroPoblado} | ubigeo:${ubigeo}`);
    var jsonRespuesta = {
        estado: "OK",
        datos: {
            "idCentroPoblado": idCentroPoblado,
            "nombreCentroPoblado": nombreCentroPoblado,
            "ubigeo": ubigeo
        }
    };
    response.json(jsonRespuesta);

});

