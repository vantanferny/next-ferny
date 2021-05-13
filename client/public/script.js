$(function() {
  const LIMIT = 5
  let offset = 0
  let page = 1

  $('#btn-search').click(function() {
    changePage(1)
  })

  const fetchShips = () => {
    const params = {
      offset: offset
    }

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
        loadPageButtons(response.pages)
      }
    });
  }

  const highlightCurrentPageButton = () => {
    $('.btn-page').removeClass('btn-page-selected')
    $(`#btn-page-${page}`).addClass('btn-page-selected')
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
          <td><button class="btn-upload">Upload</button></td>
        </tr>
      `

      $('tbody').append(row)
    });

    $('.btn-upload').click(function() {
      alert('This feature would be available in release v1.1.0')
    })
  }

  $('#input-weight').keyup(function(e) {
    if (/\D/g.test(this.value)) {
      this.value = this.value.replace(/\D/g, '');
    }
  });

  const changePage = (value) => {
    page = value
    offset = LIMIT * (page - 1)
    fetchShips()
  }

  const assignButtonPageClickFunction = () => {
    $('.btn-page').click(function() {
      changePage(Number($(this).text()))
    })
  }

  const loadPageButtons = (number) => {
    $('#pages-container').empty()

    for(let i = 1; i <= number; i++){
      $('#pages-container').append(`
        <button class="btn-page" id="btn-page-${i}">
          ${i}
        </button
      `)
    }

    assignButtonPageClickFunction()
    highlightCurrentPageButton()
  }
});