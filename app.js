const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("./middleware/cors.js");
const app = express();

const orders = require('./routes/orders.js');
const itor = require('./routes/itor.js');
const branc = require('./routes/branc.js');
const itbr = require('./routes/itbr.js');
const item = require('./routes/item.js');
const provider = require('./routes/provider.js');
const usuarios = require('./routes/usuarios.js');

//tokens
const jwt = require('jsonwebtoken');
const auth = require("./middleware/authHeader.js");
//router.use(auth);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors);

//http://rutas
app.get("/", (req, res, next) => {
    res.send("Bienvenido al API de PAPERS PLEASE");
});


app.use('/branc', branc, auth);
app.use('/itbr', itbr, auth);
app.use('/item', item, auth);
app.use('/itor', itor, auth);
app.use('/orders', orders, auth);
app.use('/provider', provider, auth);
app.use('/usuarios', usuarios);

module.exports = app;