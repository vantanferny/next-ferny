$(function() {
  $('#btn-search').click(function() {
    fetchShips()
  })

  const fetchShips = () => {
    const params = {}

    const shipTypeFilter = $('#select-ships').val()
    if (shipTypeFilter) {
      params['type'] = shipTypeFilter
    }

    const weightFilter = $('#input-weight').val()
    if (weightFilter.length > 0) {
      params['weight'] = weightFilter.trim()
    }

    const portFilter = $('#input-port').val()
    if (portFilter.length > 0) {
      params['port'] = portFilter.trim()
    }

    $.get("http://localhost:4000/ships", params, function( response ) {
      $('tbody').empty()

      if (response.error) {
        alert(`An error occured: ${response.error}`)
      } else {
        displayShips(response.data)
      }
    });
  }

  const displayShips = (ships) => {
    $(ships).each(function(_, ship) {
      const row = `
        <tr>
          <td>${ship.type}</td>
          <td>${ship.weight}</td>
          <td>${ship.port}</td>
          <td>${ship.name}</td>
          <td>${ship.class}</td>
          <td><button>Upload</button></td>
        </tr>
      `

      $('tbody').append(row)
    });
  }

  $('#input-weight').keyup(function(e) {
    if (/\D/g.test(this.value)) {
      this.value = this.value.replace(/\D/g, '');
    }
  });
});