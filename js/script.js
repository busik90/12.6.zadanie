var url = 'https://restcountries.eu/rest/v2/name/',
    countriesList = $('#countries-box');

// events
$('#search').click(searchCountries);

// class
function CountryCard(name, flagUrl, countryData) {
  var self = this;

  this.name = name;
  this.flagUrl = flagUrl;
  this.countryData = countryData;
  this.$element = createCountryCard();

  // create components of country card
  function createCountryCard() {
    var $card = $('<li>').addClass('country-card'),
        $flag = $('<img>').addClass('country-flag').attr('src', self.flagUrl),
        $header = $('<h2>').addClass('country-name').text(self.name),
        $table = $('<table>').addClass('country-info'),
        $tableHeader = $('<thead>'),
        $tableRow = $('<tr>'),
        $tableHeading = $('<th>').text('Information:'),
        $tableBody = $('<tbody>'),
        $tableData = $('<td>'),
        $tableFooter = $('<tfoot>');

    // construct country card
    $tableHeading.appendTo($tableRow);
    $tableRow.appendTo($tableHeader);

    $tableRow = $('<tr>');
                 
    $tableBody = setCountryData();

    $table.append($tableHeader)
          .append($tableBody)
          .append($tableFooter);

    $card.append($flag)
         .append($header)
         .append($table);

    return $card;
  }

  // add information to country card from table countryData
  function setCountryData() {
    var $tableBody = $('<tbody>');

    countryData.forEach(function(item) {
      var $tableRow = $('<tr>');

      $tableBody.append($tableRow);
      
      item.forEach(function(item) {
        var $tableData = $('<td>');

        $tableRow.append($tableData);
        $tableData.append(item);
      });
    });

    return $tableBody;
  }
}


function searchCountries() {
  var countryName = $('#country-name').val();

  if(!countryName.length) countryName = 'Poland';

  $.ajax({
    url: url + countryName,
    method: 'GET',
    success: makeCountriesList
  });
}

function makeCountriesList(resp) {
  countriesList.empty();
  resp.forEach(function(item) {
    var countryData = [ ['Native name', item.nativeName],
                        ['Region', item.region],
                        ['Capital', item.capital],
                        ['Timezone', item.timezones] ];

    var countryCard = new CountryCard(item.name, item.flag, countryData);

    $(countriesList).append(countryCard.$element);
    
    console.log(countryCard.$element);
  });
}