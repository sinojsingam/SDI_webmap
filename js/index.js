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



// add popup to each feature
function popUPinfo(feature, layer) {
    layer.bindPopup(feature.properties.NIMI)
   }
   // add geoJSON polygons layer
   async function addDistrictsGeoJson(url) {
    const response = await fetch(url)
    const data = await response.json()
    const polygons = L.geoJson(data, {
    onEachFeature: popUPinfo, style:polygonStyle
    })
    polygons.addTo(map)
   }
addDistrictsGeoJson('data/tartu_city_districts_edu.geojson')

// polygon style
function polygonStyle(feature) {
    return {
    fillColor: getColor(feature.properties.OBJECTID),
    fillOpacity: 0.5,
    weight: 0.8,
    opacity: 3,
    color: '#c40000',
    }
   }

function getColor(property) {
    switch (property) {
    case 1:
    return '#ff0000'
    case 13:
    return '#009933'
    case 6:
    return '#0000ff'
    case 7:
    return '#ff0066'
    default:
    return '#ffffff'
    }
}

async function addCelltowersGeoJson(url) {
    const response = await fetch(url)
    const data = await response.json()
    const markers = L.geoJson(data)
    const clusters = L.markerClusterGroup()
    clusters.addLayer(markers)
    clusters.addTo(map)
   }

addCelltowersGeoJson('data/tartu_city_celltowers_edu.geojson')

const btn = document.getElementById('default')

btn.addEventListener("click", defaultZoom);
    function defaultZoom() {
    map.setView([58.373523, 26.716045], 12)
}