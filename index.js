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
            var jason = {
                "idCentroPoblado": resultado.insertId,
                "nombreCentroPoblado": nombre,
                "ubigeo": parseInt(ubigeo)
            }
            response.json(jason);
        }
    });

});

app.post("/categoriasEquipo/create", function (request, response) {
    var nombre;
    nombre = request.body.nombreCategoriaEquipo;
    console.log(nombre);
    var sql = "INSERT INTO `inventariotest`.`categoriaequipo` (`nombre`) VALUES (?);";
    var parametros = [nombre];
    conn.query(sql, parametros, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            var jason = {
                "idCategoriaEquipo": resultado.insertId,
                "nombre": nombre,
            }
            response.json(jason);
        }
    });

});

app.post("/sitios/create", function (request, response) {
    var codigoSitio;
    codigoSitio = request.body.codigoSitio;
    var idCentroPoblado;
    idCentroPoblado = request.body.idCentroPoblado;
    var latitud;
    latitud = request.body.latitud;
    var longitud;
    longitud = request.body.longitud;

    var sql = "INSERT INTO `inventariotest`.`sitios` (`codigoSitio`, `idCentroPoblado`, `latitud`, `longitud`) VALUES (?, ?, ?, ?);";
    var parametros = [codigoSitio, idCentroPoblado, latitud, longitud];
    conn.query(sql, parametros, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            var sql2 = "SELECT * FROM inventariotest.centrospoblados where idCentroPoblado = ?;";
            var parametros2 = [idCentroPoblado];
            conn.query(sql2, parametros2, function (err2, resultado2) {


                var jason = {
                    "codigoSitio": codigoSitio,
                    "idCentroPoblado": idCentroPoblado,
                    "latitud": latitud,
                    "longitud": longitud,
                    "idSitio": resultado.insertId,
                    "nombreCentroPoblado": resultado2[0].nombreCentroPoblado,
                }
                response.json(jason);
            })

        }
    });

});

app.post("/equipos/create", function (request, response) {
    var nombreEquipo;
    nombreEquipo = request.body.nombreEquipo;
    var idCategoriaEquipo;
    idCategoriaEquipo = request.body.idCategoriaEquipo;
    var serialNumber;
    serialNumber = request.body.serialNumber;
    var modelo;
    modelo = request.body.modelo;
    var idSitio;
    idSitio = request.body.idSitio;


    var sql = "INSERT INTO `inventariotest`.`equipos` (`nombreEquipo`, `idCategoriaEquipo`, `serialNumber`, `modelo`, `idSitio`) VALUES (?,?, ?, ?, ?);";
    var parametros = [nombreEquipo, idCategoriaEquipo, serialNumber, modelo, idSitio];
    conn.query(sql, parametros, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {

            var jason = {
                "idequipo": resultado.insertId,
                "nombreEquipo": nombreEquipo,
                "idCategoriaEquipo": idCategoriaEquipo,
                "serialNumber": serialNumber,
                "modelo": modelo,
                "idSitio": idSitio,
            }
            response.json(jason);

        }
    });

});


app.listen(3000, function () {
    console.log("servidor levantado exitosamente");
});

