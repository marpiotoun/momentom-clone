const weatherContainer = document.querySelector('.js-weather');
const COORDS = "userCoords";
function saveCoords(CoordObj) {
    localStorage.setItem(COORDS, JSON.stringify(CoordObj))
}
function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const CoordObj = {
        latitude,
        longitude
    };
    saveCoords(CoordObj);
}
function handleGeoError(error) {
    console.log(error);
}
function getCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    return JSON.parse(localStorage.getItem(COORDS))
}
function getWeather(lat, lon) {
    api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b916e09f238ad621c33c1f02b6ed06ae&units=metric`
    fetch(api_url).then(function (response) {
        return response.json();
    }).then(function (json) {
        const temperture = json.main.temp;
        const place = json.name;
        weatherContainer.innerText = `${temperture} ℃ - ${place}`;
    });
}
function loadCoords() {
    let loadedCoords = JSON.parse(localStorage.getItem(COORDS));
    if (loadedCoords === null) {
        loadedCoords = getCoords();
    } else {
        getWeather(loadedCoords.latitude, loadedCoords.longitude);
    }
}
function init() {
    loadCoords();
}
init();

