'use strict';

const apiKey = 'E21bdQYk09jC25AQbiCg19OF4HzUM0BLRFKB2Zpm'; 

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  if(responseJson.data.length == 0 ) {
      $('#results-list').html('No parks found!');
  } else {
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    console.log(responseJson.data[i]);
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <div>
    <a href=${responseJson.data[i].url}>link</a>
    </div>
    <br>
    <div>${responseJson.data[i].directionsInfo}</div>
      </li>`
    )};
  $('#results').removeClass('hidden');
  }
  
};

function getParks(query, maxResults=10) {
  let options = {
  headers: {
    "accept": "application/json"
    }

  }

  let url = `https://developer.nps.gov/api/v1/parks?stateCode=${query}&limit=${maxResults}&api_key=E21bdQYk09jC25AQbiCg19OF4HzUM0BLRFKB2Zpm`
  console.log(url);

  fetch(url, options)
    .then(response => {
    return response.json();
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#results-list').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const query = $('#search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(query, maxResults);
  });
}

$(watchForm);