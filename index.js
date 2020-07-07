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
