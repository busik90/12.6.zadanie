var url = 'https://restcountries.eu/rest/v2/name/',
    countriesList = $('#countries-box');

// events
$('#search-btn').click(searchCountries);

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

        $header = $('<header>').addClass('country-header'),
        $imgFlag = $('<img>').addClass('country-flag').attr('src', self.flagUrl),
        $h2 = $('<h2>').addClass('country-name').text(self.name),

        $table = $('<table>').addClass('country-info'),
        $tableHeader = $('<thead>'),
        $tableRow = $('<tr>'),
        $tableHeading = $('<th>').text('More Information :').attr('colspan', "2"),
        $tableBody = $('<tbody>'),
        $tableData = $('<td>'),
        $tableFooter = $('<tfoot>');

    // construct country card
    $header.append($imgFlag)
           .append($h2);

    $tableHeading.appendTo($tableRow);
    $tableRow.appendTo($tableHeader);

    $tableRow = $('<tr>');
                 
    $tableBody = setCountryData();
    
    $tableData.attr('colspan', "2").text('.').appendTo($tableRow);
    $tableRow.appendTo($tableFooter);

    $table.append($tableHeader)
          .append($tableBody)
          .append($tableFooter);

    $card.append($header)
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

    var countryData = [ ['Region', item.region],
                        ['Capital', item.capital],
                        ['Native name', item.nativeName],
                        ['Languages', readObject(item.languages, 'name')],
                        ['Timezone', readObject(item.timezones)],
                        ['Currencies', readObject(item.currencies, 'code')] ];

    var countryCard = new CountryCard(item.name, item.flag, countryData);

    $(countriesList).append(countryCard.$element);
  });

  function readObject(object, param) {
    if(param != undefined) {
      var valuesArray = [];
      
      object.forEach(function(item) {
        valuesArray.push(item[param]);
        console.log(item[param]);
      });
      object = valuesArray;
    }

    return result = object.join(', ');
  }
}