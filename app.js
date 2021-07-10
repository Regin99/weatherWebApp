function setIcons(jsonObj) {
  const weatherIcons = document.querySelectorAll("#forecastIcon");
  const firstIcon = jsonObj["daily"][0]["weather"][0]["icon"];
  const secondIcon = jsonObj["daily"][1]["weather"][0]["icon"];
  const thirdIcon = jsonObj["daily"][2]["weather"][0]["icon"];
  const currentImage = jsonObj["current"]["weather"][0]["icon"];
  const currentImg = document.querySelector("#currentImg");
  currentImg.src = `assets/svg/${currentImage}.svg`;
  weatherIcons[0].src = `assets/svg/${firstIcon}.svg`;
  weatherIcons[1].src = `assets/svg/${secondIcon}.svg`;
  weatherIcons[2].src = `assets/svg/${thirdIcon}.svg`;
}

function setCityName(jsonObj) {
  const city = document.querySelector(".cityName");
  city.setAttribute("value", jsonObj["city"]);
}

const firstDay = document.createElement("p");
const tempToday = document.createElement("p");
const secondDay = document.createElement("p");
const tempTomorrow = document.createElement("p");
const thirdDay = document.createElement("p");
const tempDayAfterTomorrow = document.createElement("p");

function setTemperature(jsonObj) {
  const currentTempText = document.querySelector(".currentTemp");
  const currentContainer = document.querySelector(".current");
  currentTempText.textContent =
    Math.round(parseInt(jsonObj["current"]["temp"])) + "°";
  currentContainer.insertBefore(currentTempText, currentImg);

  tempToday.textContent =
    Math.round(parseInt(jsonObj["daily"][2]["temp"]["day"])) + " °";
  firstDay.textContent = moment(jsonObj["daily"][0]["dt"] * 1000).format(
    "DD.MM"
  );

  tempTomorrow.textContent =
    Math.round(parseInt(jsonObj["daily"][1]["temp"]["day"])) + "°";
  secondDay.textContent = moment(jsonObj["daily"][1]["dt"] * 1000).format(
    "DD.MM"
  );

  thirdDay.textContent = moment(jsonObj["daily"][2]["dt"] * 1000).format(
    "DD.MM"
  );
  tempDayAfterTomorrow.textContent =
    Math.round(parseInt(jsonObj["daily"][0]["temp"]["day"])) + "°";

  const weatherBoxs = document.querySelectorAll(".weatherBox");
  weatherBoxs[0].appendChild(firstDay);
  weatherBoxs[1].appendChild(secondDay);
  weatherBoxs[2].appendChild(thirdDay);
  weatherBoxs[0].appendChild(tempDayAfterTomorrow);
  weatherBoxs[1].appendChild(tempTomorrow);
  weatherBoxs[2].appendChild(tempToday);
}

function setMap(lat, lon) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicmVnaW45OSIsImEiOiJja3FzbWxwNHIwa3FxMnZvM3N0bmFjNm42In0.xb-QyjtVE5zpuxqtt0qiLw";
  let map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [lon, lat], // starting position [lng, lat]
    zoom: 12, // starting zoom
  });
  new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);
}
