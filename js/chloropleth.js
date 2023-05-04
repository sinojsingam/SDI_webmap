//adding leaflet defaults
var mapOptions = {
    center: [42.336004, -71.169212], //set center Lat/Long of your area of interest
    zoom: 16, //set initial zoom level
    maxZoom : 24,  //set max zoom level
    tap : false //fix popup bug on Safari
    }


let map = L.map('map').setView([58.373523, 26.716045], 12)

//Externally called basemap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

addGeoJson('data/tartu_city_districts_edu.geojson')
// add geoJSON layer
async function addGeoJson(url) {
 const response = await fetch(url)
 const data = await response.json()
 L.choropleth(data, {
 valueProperty: 'TOWERS',
 scale: ['#ffffff', '#ff9900'],
 steps: 5,
 mode: 'q', // q for quantile, e for equidistant
 style: {
 color: '#fff',
 weight: 2,
 fillOpacity: 0.8,
 },
 onEachFeature: function (feature, layer) {
 layer.bindPopup('<strong>District:</strong> '+ feature.properties.NIMI + '<br><strong>Number of Towers:</strong> ' + feature.properties.TOWERS)
 },
 }).addTo(map)
}

//default view button
const btn = document.getElementById('default')

btn.addEventListener("click", defaultZoom);
function defaultZoom() {
    map.setView([58.373523, 26.716045], 12)
}