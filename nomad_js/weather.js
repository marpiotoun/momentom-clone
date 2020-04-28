const COORDS = "userCoords";
function saveCoords(CoordObj) {
    localStorage.setItem(COORDS, JSON.stringify(CoordObj))
}
function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const CoordObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(CoordObj);
}
function handleGeoError(error) {
    console.log(error);
}
function getCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        loadedCoords = getCoords();
    } else {
        getWeather();
    }
}
function init() {
    loadCoords();
}
init();