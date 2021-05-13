const validateRequest = (params) => {
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

module.exports = validateRequest;
