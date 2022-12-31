let now = new Date();

let currentDate = document.querySelector("#current-date");

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

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

currentDate.innerHTML = `${day} ${date} ${month}`;

let currentTime = document.querySelector("#current-time");
let hour = now.getHours();
let minutes = now.getMinutes();
minutes = minutes <= 9 ? "0" + minutes : minutes;
hour = hour <= 9 ? "0" + hour : hour;

currentTime.innerHTML = `${hour}:${minutes}`;

function showWeather(response) {
  console.log(response);
  document.querySelector("#city-name").innerHTML = response.data.city;
  document.querySelector("#today-temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
}

function searchCity(city) {
  let apiKey = "15353af8tb5a96838601b6762eoe80e4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
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

let searchCityButton = document.querySelector("#city-search-form");
searchCityButton.addEventListener("submit", searchCityName);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "15353af8tb5a96838601b6762eoe80e4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function updateCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#current-city-button");
locationButton.addEventListener("click", updateCity);

searchCity("London");
