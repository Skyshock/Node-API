const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database');

router.get("/", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = "SELECT * FROM itbr";
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
router.get("/:id", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `SELECT * FROM itbr WHERE id = ${req.params.id}`;
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


router.post("/", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `INSERT INTO itbr ( itemid, branchid, aviable) 
                   VALUES ('${req.body.itemid}', '${req.body.branchid}', '${req.body.aviable}')`;
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

router.put("/", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const qry = `SELECT COUNT(*) as total FROM itbr WHERE id = ${req.body.id}`;
    console.log(qry);
    query = `UPDATE itbr SET `;
    if(req.body.itemid){
        query += `itemid = '${req.body.itemid}'`;
        if(req.body.branchid || req.body.aviable){
            query += `, `;
        }
    }

    if(req.body.branchid){
        query += `branchid = '${req.body.branchid}'`;
        if(req.body.aviable){
            query += `, `;
        }
    }

    if(req.body.aviable){
        query += `aviable = '${req.body.aviable}' `;
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

// Eliminar un itbr por id
router.delete("/", (req,res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `DELETE FROM itbr WHERE id = ${req.body.idItbr}`;
    db.query(query, (err,result, fields) => {
        if(err){
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"})
        }
        res.status(200);
        res.json({ code: 1, message: "itbr eliminado correctamente"})
        db.end((err) => { console.log("Closed")})
    })
});
module.exports = router;