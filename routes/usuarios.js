const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconn = require('../config/database');

const jwt = require('jsonwebtoken');

router.post("/login", (req, res, next)=>{
    const db = mysql.createConnection(dbconn);
    const query = `SELECT *FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
    db.query(query, (err,result, fields)=>{
        if(err){
            console.log(err);
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"})
        }
        //console.log(result);
        if(result.length > 0){
     
            const token = jwt.sign(
                { id: result[0].id, username: result[0].nombrename},
                process.env.JWT_KEY || "debugkey"
            );
            res.status(200);
            res.json({ 
                code: 1, 
                message: {id: result[0].id, username: result[0].username, name: result[0].name, email: result[0].email},
                token: token 
                });
        }else{
            res.status(401);
            res.json({ code: 2, message: "Usuario y/0 contraseña incorrectos"})
        }
        res.status(200);
        db.end((err) => { console.log("Closed")})  
    });
});
/*
router.post("/", (req, res, next)=> {
    const db = mysql.createConnection(dbconn);
    const query = `INSERT INTO usuarios (nombreUsuario, correoElectronico, password) VALUES ('${req.body.name}','${req.body.mail}','${req.body.password}')`;
    db.query(query, (err,result, fields) => {
        if(err){
            res.status(500);
            res.json({code: 0, message: "Algo salió mal"})
        }
        console.log(result);
        res.status(201);
        res.json({ code: 1, message: "Usuario agregado correctamente"})
        db.end((err) => { console.log("Closed")})  
    })
});
*/
const aut = (req, res, next) =>{
    try{
        const token = req.headers.autorization.split("")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY || "debugkey");
        req.username = decoded;
        next();
    }
    catch{
        res.estatus(401);
        res.json({message: 'Aith failed'});
    }
}
module.exports = router;
