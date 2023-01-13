function formatDate(timestamp) {
  let now = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  let date = now.getDate();
  if (date <= 9) {
    date = "0" + date;
  }

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let hour = now.getHours();
  let minutes = now.getMinutes();
  minutes = minutes <= 9 ? "0" + minutes : minutes;
  hour = hour <= 9 ? "0" + hour : hour;

  return `${day} ${date} ${month} at ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row text-center">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
   <div class="col-2">
     <div class="card">
       <h5 class="card-header">${formatDay(forecastDay.time)}</h5>
       <div class="card-body">
         <h5 class="card-title">
           <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
             forecastDay.condition.icon
           }.png" alt="weather icon" class="weather-symbol" />
         </h5>
         <p class="card-text"> ${Math.round(
           forecastDay.temperature.maximum
         )}°C/${Math.round(forecastDay.temperature.minimum)}°C</p>
       </div>
     </div>
     </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "15353af8tb5a96838601b6762eoe80e4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.city;
  document.querySelector("#today-temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document
    .querySelector("#today-icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.time * 1000
  );
  if (response.data.condition.description === "clear sky") {
    document.body.style.backgroundImage =
      "url('images/clear-sky-background.jpg')";
  } else if (
    response.data.condition.description === "few clouds" ||
    response.data.condition.description === "scattered clouds" ||
    response.data.condition.description === "broken clouds" ||
    response.data.condition.description === "overcast clouds"
  ) {
    document.body.style.backgroundImage = "url('images/clouds-background.jpg')";
  } else if (
    response.data.condition.description === "rain" ||
    response.data.condition.description === "rain shower" ||
    response.data.condition.description === "light rain" ||
    response.data.condition.description === "moderate rain" ||
    response.data.condition.description === "light intensity drizzle" ||
    response.data.condition.description === "heavy intensity rain" ||
    response.data.condition.description === "shower rain" ||
    response.data.condition.description === "light intensity shower rain"
  ) {
    document.body.style.backgroundImage = "url('images/rainy-background.jpg')";
  } else if (response.data.condition.description === "thunderstorm") {
    document.body.style.backgroundImage = "url('images/storm-background.jpg')";
  } else if (
    response.data.condition.description === "mist" ||
    response.data.condition.description === "haze" ||
    response.data.condition.description === "smoke"
  ) {
    document.body.style.backgroundImage = "url('images/mist-background.jpg')";
  } else if (
    response.data.condition.description === "snow" ||
    response.data.condition.description === "heavy snow" ||
    response.data.condition.description === "light snow"
  ) {
    document.body.style.backgroundImage = "url('images/snow-background.jpg')";
  } else {
    document.body.style.backgroundImage =
      "url('images/neutral-background.jpg')";
  }
  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "15353af8tb5a96838601b6762eoe80e4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let cityInput = document.querySelector("#enter-city");
  if (cityInput.value) {
    cityInput.value = "";
  }

  axios.get(apiUrl).then(showWeather);
}

function searchCityName(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "15353af8tb5a96838601b6762eoe80e4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function updateCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchCityButton = document.querySelector("#city-search-form");
searchCityButton.addEventListener("submit", searchCityName);

let locationButton = document.querySelector("#current-city-button");
locationButton.addEventListener("click", updateCity);

searchCity("London");
