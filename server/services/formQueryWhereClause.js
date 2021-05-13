const formQueryWhereClause = (params) => {
  if (Object.keys(params).length === 0) {
    return ''
  }

  let clause = 'WHERE'

  Object.keys(params).forEach(function(key) {
    if (key == 'offset') { return } // offset param is for pagination only

    clause += ` ${key} = '${params[key]}' AND`
  })

  return clause.slice(0, -4) // remove last " AND"
}

module.exports = formQueryWhereClause;
