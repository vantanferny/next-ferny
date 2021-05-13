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

app.get('/ships', async (req, res) => {
    const validationResult = requestValidator(req.query)
    if (!validationResult.success) {
        res.send({
            error: validationResult.error
        });

        return;
    }

    const query = `SELECT * FROM ships ${whereClause(req.query)};`
    const rows = await dbPool.query(query);

    res.status(200);
    res.send({
        data: rows
    });
});

const whereClause = (params) => {
    if (Object.keys(params).length === 0) {
        return ''
    }

    let clause = 'WHERE'

    Object.keys(params).forEach(function(key) {
        clause += ` ${key} = '${params[key]}' AND`
    })

    return clause.slice(0, -4) // remove last " AND"
}

const requestValidator = (params) => {
    if (Object.keys(params).length === 0) {
        return {
            success: true
        }
    }

    if (params['type']) {
        const validShipTypes = ['Tug', 'Cargo', 'Barge', 'High Speed Craft']

        if (!validShipTypes.includes(params['type'])) {
            return {
                success: false,
                error: 'Ship type invalid.'
            }
        }
    }

    if (params['weight']) {
        if (isNaN(params['weight'])) {
            return {
                success: false,
                error: 'Weight should be a number.'
            }
        }
    }

    return {
        success: true
    }
}

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);