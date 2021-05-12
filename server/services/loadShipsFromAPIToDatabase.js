const fetchShipsFromAPI = require('./fetchShipsFromAPI')
const dbPool = require('../db');

const loadShipsFromAPIToDatabase = async () => {
  const ships = await fetchShipsFromAPI();

  for (const ship of ships) {
    const insert = await insertShipToDatabase(ship) // verify if unused variable is really needed
  }
}

const insertShipToDatabase = async (ship) => {
  await dbPool.query(formInsertQuery(ship))
}

const formInsertQuery = (ship) => {
  return `
    INSERT INTO ships
      (id, type, weight, name, port, class)
    VALUES
      ('${ship.id}', '${ship.type}', ${ship.weight}, '${ship.name}', '${ship.port}', ${ship.class})
  `
}

module.exports = loadShipsFromAPIToDatabase;
