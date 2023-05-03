var mapOptions = {
    center: [42.336004, -71.169212], //set center Lat/Long of your area of interest
    zoom: 16, //set initial zoom level
    maxZoom : 24,  //set max zoom level
    tap : false //fix popup bug on Safari
    }


let map = L.map('map').setView([58.373523, 26.716045], 12)

//Example of an externally called basemap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



addGeoJson('data/tartu_city_celltowers_edu.geojson')
// add geoJSON layer
async function addGeoJson(url) {
 const response = await fetch(url)
 const data = await response.json()
 const heatData = data.features.map(heatDataConvert)
 const heatMap = L.heatLayer(heatData, { radius: 10 })
 heatMap.addTo(map)
}
// prepare spatial data for Leaflet heat
function heatDataConvert(feature) {
 return [
 feature.geometry.coordinates[1],
 feature.geometry.coordinates[0],
 feature.properties.area,
 ]
}

const btn = document.getElementById('default')

btn.addEventListener("click", defaultZoom);
    function defaultZoom() {
    map.setView([58.373523, 26.716045], 12)
   }
