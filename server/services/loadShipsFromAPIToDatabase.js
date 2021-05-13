const fetchShipsFromAPI = require('./fetchShipsFromAPI')
const dbPool = require('../db');

const loadShipsFromAPIToDatabase = async () => {
  await purgeShipsInDatabase();
  const ships = await fetchShipsFromAPI();

  for (const ship of ships) {
    await insertShipToDatabase(ship)
  }
}

const purgeShipsInDatabase = async () => {
  await dbPool.query('DELETE FROM ships;')
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
