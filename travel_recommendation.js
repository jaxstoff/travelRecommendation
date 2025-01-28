const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

// Get Timezone/time
function getTimeTz(cityctry){
// defult to NYC
let city = cityctry.split(',')[0];
let tz = city.length > 0 ? city:'New York City';
let locale = '';

switch(tz.toLowerCase()) {
  case "sydney":
    locale = "Australia/Sydney";
    break;
  case "melbourne":
    locale = "Australia/Melbourne";
    break;
    case "tokyo":
      locale = "Asia/Tokyo";
      break;
    case "kyoto":
      locale = "Asia/Tokyo";
      break;
    case "rio de janeiro":
      locale = "Brazil/East";
      break;
    case "são paulo":
      locale = "America/Sao_Paulo";
      break;
    case "new york city":
      locale = "America/New_York";
      break;  
  }

  const options = { timeZone: locale, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const localTime = new Date().toLocaleTimeString('en-US', options);
  console.log(`Current time in ${tz}: ${localTime}`);
  return localTime;

}

function resetSearch() {
    document.getElementById("searchText").value = "";
    const resultDiv = document.getElementById('recommendations');
    resultDiv.innerHTML = '';
  }

  // search for a city/beach/temple
  function searchCTB(){
    const country_srch = ["country","countries"];
    const temple_srch = ["temple","temples"];
    const beach_srch = ["beach","beaches"];
    
    const input = document.getElementById('searchText').value.toLowerCase();
    let searchType;

    if (country_srch.includes(input))
        searchType = "country";
    else if (temple_srch.includes(input))
        searchType = "temple";
    else if (beach_srch.includes(input))
        searchType = "beach";
    else 
        searchType = "";
    
        console.log("Search Type:",searchType);

    switch(searchType){
        case "country":
            searchCountry();
            break;
        case "beach":
            searchBeach();
            break;
        case "temple":
            searchTemple();
            break;
        default:
            alert("No recommendations found");
            break;
    }
  }
  
  function searchCountry() {
    
    const resultDiv = document.getElementById('recommendations');
    resultDiv.innerHTML = '';
    let city = ''

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const countries = data.countries.filter((item) => item.name !== "")

        if (countries) {
          console.log(countries);
          for (var i = 0; i < countries.length; i++){
            for (var j = 0; j < countries[i].cities.length; j++){
              let localTime = getTimeTz(countries[i].cities[j].name);
              city += `<hr><div class="grid-child recomend" id="tmpl-${countries[i].id}">`+
              `<div class= "recimg"><img src="${countries[i].cities[j].imageUrl}" alt="${countries[i].cities[j].name}"></div>`+
              `<h2>${countries[i].cities[j].name}</h2><p>${countries[i].cities[j].description}</p>`+
              `<p id="showTime">Current time in ${countries[i].cities[j].name} : ${localTime}</p>
              <p id="visit"><button>Visit</button></p></div>`;
              console.log(`Id: ${countries[i].id} - ${countries[i].cities[j].name}`);
              console.log(`Id: ${countries[i].cities[j].imageUrl} - ${countries[i].cities[j].description}`);
            }
          }
          resultDiv.innerHTML = `<div class="rec-container">`+ city +`</div>`;
        } else {
          resultDiv.innerHTML = 'Country not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }

  function searchBeach() {
    const resultDiv = document.getElementById('recommendations');
    resultDiv.innerHTML = '';
    let beach = '';

    fetch('travel_recommendation_api.json')
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error(`HTTP error, status = ${response.status}`);
    //   }
    //   return response.json();
    // })
      .then(response => response.json())
      .then(data => {
        const beaches = data.beaches.filter((item) => item.name !== "");

        if (beaches) {
          console.log(beaches);
          for (var i = 0; i < beaches.length; i++){
            beach += `<hr><div class="grid-child recomend" id="tmpl-${beaches[i].id}">`+
            `<div class= "recimg"><img src="${beaches[i].imageUrl}" alt="${beaches[i].name}"></div>`+
            `<h2>${beaches[i].name}</h2><p>${beaches[i].description}</p>`+
            `<p id="visit"><button>Visit</button></p></div>`;
            console.log(`Id: ${beaches[i].id} - ${beaches[i].name}`);
            console.log(`Id: ${beaches[i].imageUrl} - ${beaches[i].description}`);
          }
          resultDiv.innerHTML = `<div class="rec-container">`+ beach +`</div>`;        
        } else {
          resultDiv.innerHTML = 'Beaches not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
  

  function searchTemple() {
    const resultDiv = document.getElementById('recommendations');
    resultDiv.innerHTML = '';
    let temple = '';

    fetch('travel_recommendation_api.json')
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error(`HTTP error, status = ${response.status}`);
    //   }
    //   return response.json();
    // })
      .then(response => response.json())
      .then(data => {
        const temples = data.temples.filter((item) => item.name !== "");

        if (temples) {
          console.log(temples);
          for (var i = 0; i < temples.length; i++){
            temple += `<hr><div class="grid-child recomend" id="tmpl-${temples[i].id}">`+
            `<div class= "recimg"><img src="${temples[i].imageUrl}" alt="${temples[i].name}"></div>`+
            `<h2>${temples[i].name}</h2><p>${temples[i].description}</p>`+
            `<p id="visit"><button>Visit</button></p></div>`;
            console.log(`Id: ${temples[i].id} - ${temples[i].name}`);
            console.log(`Id: ${temples[i].imageUrl} - ${temples[i].description}`);

          }
          resultDiv.innerHTML = `<div class="rec-container">`+ temple +`</div>`;        
        } else {
          resultDiv.innerHTML = 'Temples not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }

 btnSearch.addEventListener('click', searchCTB);
 btnReset.addEventListener('click', resetSearch);
 