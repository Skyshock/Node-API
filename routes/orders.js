const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database');

//tokens
const jwt = require('jsonwebtoken');
const auth = require("../middleware/authHeader.js");
router.use(auth);

router.get("/", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = "SELECT * FROM orders";
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
    const query = `SELECT * FROM orders WHERE id = ${req.params.id}`;
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

/*
router.post("/", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `SELECT * FROM camiones WHERE idCamion = ${req.params.id}`;
    db.query(query, (err,result, fields) => {
        if(err){
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"})
        }
        console.log(result);
        res.status(200);
        res.json({ code: 1, message: result})
        db.end((err) => { console.log("Closed")})
    });
});
*/

router.post("/", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = `INSERT INTO orders ( totalPrice, payed, userid, paidOut) 
                   VALUES ('${req.body.totalPrice}', '${req.body.payed}', '${req.body.userid}', '${req.body.paidOut}')`;
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

// Update camiones
router.put("/", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const qry = `SELECT COUNT(*) as total FROM orders WHERE id = ${req.body.id}`;
    console.log(qry);
    query = `UPDATE orders SET `;
    
    if(req.body.totalPrice){
        query += `totalPrice = '${req.body.totalPrice}' `;
    }
    if(req.body.payed){
        query += `payed = '${req.body.payed}', `;
    }

    if(req.body.userid){
        query += `userid = '${req.body.userid}', `;
    }

    if(req.body.paidOut){
        query += `paidOut = '${req.body.paidOut}' `;
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
                res.json({ code: 1, message: "Objeto editado correctamente" });
                db.end((err) => { console.log("closed") });
            });
        }else{
            res.status(500);
            res.json({ code: 0, message: "El id no existe" });
        }   
    });
});


module.exports = router;