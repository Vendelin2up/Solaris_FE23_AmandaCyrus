const sun = document.getElementById("sunInfo");
const merkurius = document.getElementById("merkuriusInfo");
const venus = document.getElementById("venusInfo");
const jorden = document.getElementById("jordenInfo");
const mars = document.getElementById("marsInfo");
const jupiter = document.getElementById("jupiterInfo");
const saturnus = document.getElementById("saturnusInfo");
const uranus = document.getElementById("uranusInfo");
const neptunus = document.getElementById("neptunusInfo");

let fetchData = []; // Initiera fetchData som en tom array
// let infoBox;

async function bodiesInfo() {
  const URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies";
  const key = {
    method: "GET",
    headers: { "x-zocom": "solaris-NKsTcw3OPrMQPoSz" },
  };
  try {
    const response = await fetch(URL, key);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    fetchData = await response.json(); // Uppdatera fetchData med hämtade data
    console.log(fetchData); // Logga fetchData för att se den hämtade datan
    return fetchData;
  } catch (error) {
    console.error("Så puttinuttigt....MEN DET E FEEEL!", error);
    throw error;
  }
}

bodiesInfo().then(() => {
  // console.log(fetchData.bodies[0]);
});

// Försök till en stängingsknapp, den misslyckades
// document.addEventListener('DOMContentLoaded', function() {
//   infoBox = document.getElementById('infoBox');
//   const closeButton = document.getElementById('closeButton');
//   closeButton.addEventListener('click', function() {
//       infoBox.style.display = 'none';
//   });
// });

// Lägg till en händelselyssnare för klickhändelsen för att kunna få upp rätt
// info till rätt planet. Finns säkert ett snyggare sätt att skriva med kortare
// kod men jag har skrivit så här nu, antagligen den långa vägen. 
sun.addEventListener("click", function (event) {
  event.stopPropagation();
  displayPlanetInfo(fetchData.bodies[0]);
});
merkurius.addEventListener("click", function (event) {
  event.stopPropagation();
  displayPlanetInfo(fetchData.bodies[1]);
});
venus.addEventListener("click", function (event) {
  event.stopPropagation();
  displayPlanetInfo(fetchData.bodies[2]);
});
jorden.addEventListener("click", function (event) {
  event.stopPropagation();
  displayPlanetInfo(fetchData.bodies[3]);
});
mars.addEventListener("click", function (event) {
  event.stopPropagation();
  displayPlanetInfo(fetchData.bodies[4]);
});
jupiter.addEventListener("click", function (event) {
  event.stopPropagation();
  displayPlanetInfo(fetchData.bodies[5]);
});
saturnus.addEventListener("click", function (event) {
  event.stopPropagation();
  displayPlanetInfo(fetchData.bodies[6]);
});
uranus.addEventListener("click", function (event) {
  event.stopPropagation();
  displayPlanetInfo(fetchData.bodies[7]);
});
neptunus.addEventListener("click", function (event) {
  event.stopPropagation();
  displayPlanetInfo(fetchData.bodies[8]);
});

//hämnta varje planet, sätt eventlistener på varje element, och sen vad som ska hända när man klickar på varje
function displayPlanetInfo(planetData) {
  const infoBox = document.getElementById("infoBox");
  infoBox.innerHTML = `
  <h1>${planetData.name}</h1>
  <h2>${planetData.latinName}</h2>
  <p>${planetData.desc}</p>
  <div class="info-container">
  <div class="flex-row">
  <h3 class="info-title">Omkrets: </h3>
  <p>${planetData.circumference} km</p>
  </div>
  <div class="flex-row">
  <h3 class="info-title">Km från Solen: </p>
  <p>${planetData.distance} km</p>
  </div>
  <div class="flex-row">
  <h3 class="info-title">Temperaturer: </h3>
  <div class="flex-row">
  <h4 class="sub-info-title">Dag-temperatur:  </h4>
  <p>${planetData.temp.day} grader C  </p>
  <h4 class="sub-info-title">Natt-temperatur: </h4>
  <p>${planetData.temp.night} grader C</p>
  </div>
  </div>
  <div class="flex-row">
  <h3>Månar:  </h3>
  <p class="info-title">  ${planetData.moons.join(', ')}</p>
  </div>
  </div>
  
`;
  // Visa infoBox när den är fylld med information
  infoBox.style.display = "block";
  infoBox.style.position = "absolute";
}


// Sök-funktionen
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('searchInput');

// Lägg till en händelselyssnare för submit-händelsen på sökformuläret
searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    try {
        // Hämta planetdata från API:et
        const planetData = await bodiesInfo();
        // Sök igenom planetdata för att hitta en matchande planet
        const matchingPlanet = planetData.bodies.find(planet => planet.name.toLowerCase() === searchTerm);
        if (matchingPlanet) {
            // Visa infoBoxen för den matchande planeten
            displayPlanetInfo(matchingPlanet);
        } else {
            alert("Ingen matchande planet hittades.");
        }
    } catch (error) {
        console.error("Så puttunuttigt....med det vart fel!", error);
    }
});
// Hämta referensen till infoBoxen
const infoBox = document.getElementById('infoBox');

// Lägger till att kunna trycka utanför boxen för att få den att stänga sig
document.addEventListener('click', function(event) {
    // Kontrollera om klicket skedde utanför infoBoxen
    if (!infoBox.contains(event.target)) {
        // Göm infoBoxen om klicket skedde utanför den
        infoBox.style.display = 'none';
    }
});

// Avslutningsvis vill jag berätta att förra veckan upptäckte man att 
// Neptunus har 2 st nya månar och Uranus 1 till. 
// En av Neptunus nya månar har en omloppsbana på ca 27 år, vilket gör 
// den till den längsta i vårt solsytem. 
// Den nya månen på Uranus tror dem har en beräknad diameter på 8 kilometer
// vilket gör den till planeterns minsta. 