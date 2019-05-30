const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database');


//Trae todos los  datos de la tabla
router.get("/", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = "SELECT * FROM branc";
    db.query(query, (err, result, fields) => {
        if (err) {
            res.status(500);
            res.json({ code: 0, message: "Algo salió mal" })
        }
        console.log(result);
        res.status(200);
        res.json({ code: 1, message: result })
        db.end((err) => { console.log("Closed") })
    });
});

//Selecciona el dato con el id
router.get("/:id", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `SELECT * FROM branc WHERE id = ${req.params.id}`;
    db.query(query, (err, result, fields) => {
        if (err) {
            res.status(500);
            res.json({ code: 0, message: "Algo salió mal" })
        }
        console.log(result);
        res.status(200);
        res.json({ code: 1, message: result })
        db.end((err) => { console.log("Closed") })
    })
});

//Inserta datos
router.post("/", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `INSERT INTO branc ( name, address, visitDay) 
                   VALUES ('${req.body.name}', '${req.body.address}', '${req.body.visitDay}')`;
    db.query(query, (err, result, fields) => {
        console.log(err)
        if (err) {
            console.log(err);
            res.status(500);
            res.json({ code: 0, message: "Algo salió mal" });
        }
        res.status(201);
        res.json({ code: 1, message: "Objeto añadido correctamente" });
        db.end((err) => { console.log("closed") });
    });
});

//Cambios una vez creado el campo
router.put("/", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const qry = `SELECT COUNT(*) as total FROM branc WHERE id = ${req.body.id}`;
    console.log(qry);
    query = `UPDATE branc SET `;
    if(req.body.name){
        query += `name = '${req.body.name}'`;
        if(req.body.address || req.body.visitDay){
            query += `, `;
        }
    }

    if(req.body.address){
        query += `address = '${req.body.address}' `;
        if(req.body.visitDay){
            query += `, `;
        }
    }

    if(req.body.visitDay){
        query += `visitDay = '${req.body.visitDay}' `;
    }
    query += `WHERE id = ${req.body.id} `; 
    console.log(query);

    db.query(qry, (err, result, fields) => {
        console.log('error: ' + err)
        console.log(result)
        if (err) {
            console.log('Error existencia: ' + err);
            res.status(500);
            res.json({ code: 0, message: "Algo salió mal" });
        }else if(result[0].total == 1){
            console.log(result[0].total);
            db.query(query, (err, result, fields) => {
                console.log(err)
                if (err) {
                    console.log('Error de cambio: ' + err);
                    res.status(500);
                    res.json({ code: 0, message: "Algo salió mal" });
                }
                res.status(201);
                res.json({ code: 1, message: "Sucursal editada correctamente" });
                db.end((err) => { console.log("closed") });
            });
        }else{
            res.status(500);
            res.json({ code: 0, message: "El id no existe" });
        }   
    });
});

// Eliminar un branch por id
router.delete("/", (req,res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `DELETE FROM branc WHERE id = ${req.body.idBranc}`;
    db.query(query, (err,result, fields) => {
        if(err){
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"})
        }
        res.status(200);
        res.json({ code: 1, message: "Branch eliminado correctamente"})
        db.end((err) => { console.log("Closed")})
    })
});

module.exports = router;