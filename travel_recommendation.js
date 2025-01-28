const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');


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
        searchType = "temple";
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

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const countries = data.countries.find(item => item.name !== "");

        if (countries) {
            console.log(countries);
            resultDiv.innerHTML = "<p>Found some countries</p>"
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

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const beaches = data.beaches.find(item => item.name !== "");

        if (beaches) {
            console.log(beaches);
            resultDiv.innerHTML = "<p>Found some beaches</p>"
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

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const temples = data.temples.find(item => item.name !== "");

        if (temples) {
          console.log(temples);
          resultDiv.innerHTML = "<p>Found some temples</p>"
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
 