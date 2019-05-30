const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database');

//tokens
const jwt = require('jsonwebtoken');
const auth = require("../middleware/authHeader.js");
router.use(auth);

// const fs = require('mysql');
// let routes = fs.readFileSync('../config/database');
// routes = JSON.parse(routes);

router.get("/", (req, res, next) => {
    const db = mysql.createConnection(dbconn);
    const query = "SELECT * FROM provider";
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
    const query = `SELECT * FROM provider WHERE id = ${req.params.id}`;
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
    const query = `INSERT INTO provider (name, email, categories, deliveryDay) 
                   VALUES ('${req.body.name}', '${req.body.email}', '${req.body.categories}', '${req.body.deliveryDay}')`;
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
    const qry = `SELECT COUNT(*) as total FROM provider WHERE id = ${req.body.id}`;
    console.log(qry);
    query = `UPDATE provider SET `;
    if(req.body.name){
        query += `name = '${req.body.name}', `;
    }

    if(req.body.email){
        query += `email = '${req.body.email}', `;
    }

    if(req.body.categoties){
        query += `categoties = '${req.body.categoties}' `;
    }
    
    if(req.body.deliveryDay){
        query += `deliveryDay = '${req.body.deliveryDay}' `;
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