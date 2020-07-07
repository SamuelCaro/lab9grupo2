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
    });
});

app.get("/sitios/get/:id"), function (request, response) {

    var idSitio = request.params.id;
    var sql = "SELECT s.codigoSitio, s.idCentroPoblado, s.latitud, s.longitud, s.idSitio, c.nombreCentroPoblado,(SELECT count(*) FROM inventariotest.equipos where equipos.idSitio = ? ) as cantidadEquipos FROM inventariotest.sitios as s inner join centrospoblados as c on c.idCentroPoblado =s.idCentroPoblado where idSitio = ?  ;";
    var params = [idSitio, idSitio];
    var sql2 = "SELECT * FROM inventariotest.equipos inner join categoriaequipo on categoriaequipo.idCategoriaEquipo = equipos.idCategoriaEquipo where idSitio = ?;"
    var params2 = [idSitio];

    conn.query(sql, params, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {

            conn.query(sql2, params2, function (err2, resultado2) {
                var texto;
                texto =
                for (var i = 0; i < resultado.cantidadEquipos; i++) {
                    texto.append()
                    resultado2[i].
                }

                response.json(jason);
            })




        }
    });






}