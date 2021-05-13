const dbPool = require('./db');
const express =require('express');
const bodyParser = require('body-parser');
const services = require('./services');
const cron = require('node-cron');

const app = express();
const PAGINATION_LIMIT = 5

const everyMidnight = '0 0 * * *'
cron.schedule(everyMidnight, async () => {
  await services.loadShipsFromAPIToDatabase()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function (_, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  next();
});

app.get('/ships', async (req, res) => {
  const validationResult = services.validateRequest(req.query)
  if (!validationResult.success) {
    res.send({
      error: validationResult.error
    });

    return;
  }

  const query = `
    SELECT * FROM ships
    ${services.formQueryWhereClause(req.query)}
    LIMIT ${PAGINATION_LIMIT} OFFSET ${req.query.offset};`

  let rows = await dbPool.query(query);
  if (rows.length === 0) {
    await services.loadShipsFromAPIToDatabase()
    rows = await dbPool.query(query);
  }

  const rawCountResult = await dbPool.query(`SELECT COUNT(*) AS total FROM ships ${services.formQueryWhereClause(req.query)};`);
  const numberOfPages = Math.ceil(rawCountResult[0].total / PAGINATION_LIMIT)

  res.status(200);
  res.send({
    data: rows,
    pages: numberOfPages
  });
});

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);