const axios = require('axios');

const SPACE_X_SHIPS_URL = 'https://api.spacexdata.com/v4/ships';

const fetchShipsFromAPI = async () => {
  const response = await axios.get(SPACE_X_SHIPS_URL)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log('error =>', error);

    return null;
  })

  if (response) {
    const parsedShips = parseShips(response.data);

    return parsedShips
  }

  return response;
}

const parseShips = (unparsedShips) => {
  const parsedShips = unparsedShips.map(parseShip);

  return parsedShips;
}

const parseShip = (unparsedShip) => {
  return {
    id: unparsedShip.id,
    type: unparsedShip.type,
    weight: unparsedShip.mass_kg,
    port: unparsedShip.home_port,
    class: unparsedShip.class,
  }
}

module.exports = fetchShipsFromAPI;