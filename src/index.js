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
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#today-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function updateCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#current-city-button");
locationButton.addEventListener("click", updateCity);

searchCity("London");
