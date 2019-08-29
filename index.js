const apiKey = 'uQg4mKwzqfSmbs6KIVKBgtz8OS4ZbnGAcloeOV7z';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}


function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  responseJson.data.forEach(content => {
    $('#results-list').append(
      `
      <li>
      <h3><a href="${content.url}">${content.fullName}</a></h3>
      <p>${content.description}</p>
      </li>`
    );
  });
}

function getParks(states, maxResults) {

  const params = {
    stateCode: states,
    api_key: apiKey,
    limit: maxResults
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);


  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#errormessage').text(`Something went wrong: ${err.message}`);
    });
  
}

function displayParkList() {
  $('#park-search').submit(event => {
    event.preventDefault();
    const state = $('#search-parks').val().split(',');
    let maxResults = $('#dispaly-num').val();
    getParks(state, maxResults);

  });}


$(displayParkList)