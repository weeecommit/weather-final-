function updateWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);
    let cityElement = document.querySelector("#weather-city");
    cityElement.innerHTML = response.data.city;
    let descrptionElement = document.querySelector("#description");
    descrptionElement.innerHTML = response.data.condition.description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;

    let bodyElement = document.querySelector("body");
    let weatherCondition = response.data.condition.description.toLowerCase();
    let backgroundColor, textColor;

    if (weatherCondition.includes("sunny")) {
        backgroundColor = "darkgoldenrod";
        textColor = "darkgoldenrod";
    } else if (weatherCondition.includes("clouds") || weatherCondition.includes("clear")) {
        backgroundColor = "gray";
        textColor = "gray";
    } else if (weatherCondition.includes("rainy") || weatherCondition.includes("rain")) {
        backgroundColor = "cornflowerblue";
        textColor = "cornflowerblue";
    } else {
        backgroundColor = "seashell";
        textColor = "seashell";
    }

    bodyElement.style.backgroundColor = backgroundColor;

    document.documentElement.style.setProperty('--text-color', textColor);

    getForecast(response.data.city);
}





function searchCity(city) {
  let apiKey = "db7f142eaefbo73ffc22t50dbbc48b65";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(updateWeather);
}


function handleSearch(event){
    event.preventDefault();
    let searchInput = document.querySelector("#cityform-input");
    let cityElement = document.querySelector("#weather-city");
    let cityInput = searchInput.value;

  
    cityElement.innerHTML = cityInput;
    searchCity(cityInput);

}

function getForecast (city){
  let apikey = "db7f142eaefbo73ffc22t50dbbc48b65"
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl)
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}


function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";


  let currentDate = new Date();
  let currentDayTimestamp = Math.floor(currentDate.getTime() / 1000);


  let filteredForecast = response.data.daily.filter(day => {
    return day.time > currentDayTimestamp;
  });

  filteredForecast.slice(0, 5).forEach(function(day) {
    forecastHTML += `
      <div class="weather-forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="forecast-icon"/>
        <div class="forecast-temperatures">
          <div class="forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}</strong>
          </div>
          <div class="forecast-temperature">${Math.round(day.temperature.minimum)}</div>
        </div>
      </div>
    `;
  });

  forecastElement.innerHTML = forecastHTML;
}




let searchCityElement = document.querySelector("#search-form");
searchCityElement.addEventListener("submit",handleSearch);

searchCity("Paris");




