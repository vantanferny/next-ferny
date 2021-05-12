const dbPool = require('./db');
const express =require('express');
const bodyParser = require('body-parser');

// use it before all route definitions

const app = express();

// to be called every 24 hours / if not in cache
// const loadShipsFromAPIToDatabase = require('./services/loadShipsFromAPIToDatabase');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function (_, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    next();
});

app.get('/', async (req, res) => {
    const rows = await dbPool.query('select * from ships;');
    res.status(200);
    res.send(rows);
});

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);