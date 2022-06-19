//import fetch from "node-fetch";

const API_KEY = "e5f24e2ac1b06379097526f4c971a8ce";

const search_btn = document.getElementById("search-btn");
search_btn.addEventListener("click", search);

function search() {
  const city = document.querySelector("#search-bar").value;
  loadData(city);
}

const loadData = async function (city) {
  let geodata = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error(err));

  let lat = geodata[0].lat;
  let lon = geodata[0].lon;

  let weatherdata = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => displayData(data))
    .catch((err) => console.error(err));
};

function displayData(data) {
  let placename = data.name;
  let temp = data.main.temp;
  let weatherstatus = data.weather[0].main;
  let cardtitle = document.getElementById("card-title");
  cardtitle.innerText = placename;
  let cardtemp = document.getElementById("card-text");
  cardtitle.innerText = "Temp is " + temp;

  let status = document.getElementById("status");
  status.innerText = weatherstatus;
}

function getDominantColor(image) {
  const ColorThief = require("colorthief");

  color = ColorThief.getColor(image)
    .then((color) => {
      color;
      console.log(color);
    })
    .catch((err) => {
      console.log(err);
    });

  ColorThief.getPalette(image, 5)
    .then((palette) => {
      console.log(palette);
    })
    .catch((err) => {
      console.log(err);
    });
}
