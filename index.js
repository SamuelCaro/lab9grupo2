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


//localhost:3000/centrosPoblados/get
app.get("/centrosPoblados/get", function (request, response) {

    var query = "select * from centrosPoblados";
    conn.query(query, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });
});

//localhost:3000/centrosPoblados/get/:id
app.get("/centrosPoblados/get/:id", function (request, response) {
    var id = request.params.id;
    var query = "select * from centrosPoblados where idCentroPoblado =" + id;
    conn.query(query, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });
});



//localhost:3000/categoriasEquipo/get
app.get("/categoriasEquipo/get", function (request, response) {
    var query = "select * from categoriaEquipo";
    conn.query(query, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });
});

//localhost:3000/categoriasEquipo/get/:id
app.get("/categoriasEquipo/get/:id", function (request, response) {
    var id = request.params.id;
    var query = "select * from categoriaEquipo where idCategoriaEquipo = " + id;
    conn.query(query, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });
});


//localhost:3000/sitios/get
app.get("/sitios/get", function (request, response) {
    var query = "select * from sitios";
    conn.query(query, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });
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
    var variablesql = "UPDATE `inventariotest`.`centrospoblados` SET `nombreCentroPoblado` = ?, `ubigeo` = ? WHERE (`idCentroPoblado` = ?)";
    var parametros = [nombreCentroPoblado, ubigeo, idCentroPoblado];
    conn.query(variablesql, parametros, function (err, jsonRespuesta) {
        if (err) {
            console.log(err);
        } else {
            jsonRespuesta = {

                "idCentroPoblado": idCentroPoblado,
                "nombreCentroPoblado": nombreCentroPoblado,
                "ubigeo": ubigeo

            };
            response.json(jsonRespuesta);
        }
    });
});

//localhost:3000/categoriasEquipo/update
/* Parámetros:
* idCategoriaEquipo Integer
* nombreCategoriaEquipo Integer
*  */
app.post("/categoriasEquipo/update ", function (request, response) {

    var idCategoriaEquipo = request.body.idCategoriaEquipo;
    var nombreCategoriaEquipo = request.body.nombreCategoriaEquipo;

    var variablesql = "UPDATE `inventariotest`.`categoriaequipo` SET `nombre` = ? WHERE (`idCategoriaEquipo` = ?)";
    var parametros = [nombreCategoriaEquipo, idCategoriaEquipo];
    conn.query(variablesql, parametros, function (err, jsonRespuesta) {
        if (err) {
            console.log(err);
        } else {
            jsonRespuesta = {
                "idCategoriaEquipo": idCategoriaEquipo,
                "nombre": nombreCategoriaEquipo

            };
            response.json(jsonRespuesta);
        }
    })
});