const geolocationURL =
  "https://ipgeolocation.abstractapi.com/v1/?api_key=0114551861ca4ad5b222750b725754a6";

async function sendRequest(url) {
  return await fetch(url).then((response) =>
    response.json().then((data) => {
      return data;
    })
  );
}

function getData() {
  sendRequest(geolocationURL).then((data) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data["latitude"]}&lon=${data["longitude"]}&exclude=minutely,hourly&units=metric&appid=78839745a89023129881747e0b14fefd`;
    sendRequest(weatherURL).then((data) => {
      setTemperature(data);
      setIcons(data);
      const locationURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${data["latitude"]}&longitude=${data["longitude"]}&localityLanguage=ru`;
      sendRequest(locationURL).then((data) => {
        setCityName(data);
        setMap(data["latitude"], data["longitude"]);
      });
    });
  });
}

function getNewData(city) {
  const newGeolocatonURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=78839745a89023129881747e0b14fefd`;
  sendRequest(newGeolocatonURL).then((data) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0]["lat"]}&lon=${data[0]["lon"]}&exclude=minutely,hourly&units=metric&appid=78839745a89023129881747e0b14fefd`;
    sendRequest(weatherURL).then((data) => {
      setTemperature(data);
      setIcons(data);
      setMap(data["lat"], data["lon"]);
    });
  });
}
