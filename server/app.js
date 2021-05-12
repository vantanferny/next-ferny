const dbPool = require('./db');
const express =require('express');
const bodyParser = require('body-parser');

const app = express();

const fetchShipsFromAPI = require('./services/fetchShipsFromAPI');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', async (req, res) => {
    const ships = await fetchShipsFromAPI();
    console.log(ships)

    const rows = await dbPool.query('select * from ships;');
    res.status(200);
    res.send({
        result: JSON.stringify(rows)
    });
});

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);