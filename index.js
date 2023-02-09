import { getOffset, createInfo } from "./helpers";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from "../images/icon-location.svg";

createInfo()


const ipInput = document.querySelector('.search-bar__input')
const btnInput = document.querySelector('.search-bar__btn')
const windowError = document.querySelector('.error__window')
const mapArea = document.querySelector('.map')
const map = L.map(mapArea, {
    center: [53.9, 27.56667],
    zoom: 13
})
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const locationMarker = L.icon({
    iconUrl: icon,

    iconSize:     [30, 40], // size of the icon
});
L.marker([53.9, 27.56667], {icon: locationMarker}).addTo(map);
const popupMap = L.popup()
    .setLatLng([53.903, 27.56667])
    .setContent("Search for IP")
    .openOn(map);






const ip = document.getElementById('ip') 
const isp = document.getElementById('isp')
const timeZone = document.getElementById('timezone')
const location = document.getElementById('location')

ipInput.addEventListener('keydown', handlerClick)
btnInput.addEventListener('click', getDate)
function handlerClick(event) {
    //validation 
    if(event.key === 'Enter') getDate()
}
function getDate() {
        if(ipInput.value == '') return getError()
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_zXNPrKS4fHmwHf37gahMFn3hE0HxR&ipAddress=${ipInput.value}`)
        .then((result) => result.json())
        .then(result => {
            if(!result.ip) {
                getError()
             } else {
               setInfo(result)
            }
        })
}
function getError() {
    windowError.classList.add('active')
    setTimeout(() => windowError.classList.remove('active'), 4000)
}
function setInfo(data) {
    ip.innerHTML = data.ip
    isp.innerHTML = data.isp
    timeZone.innerHTML = data.location.timezone
    location.innerHTML = data.location.country + ' ' + data.location.region
    map.setView([data.location.lat, data.location.lng])
    L.marker([data.location.lat, data.location.lng], {icon: locationMarker}).addTo(map);
    popupMap.setLatLng([data.location.lat + 0.003, data.location.lng])
    popupMap.setContent(`${data.location.city}`)

    if (window.matchMedia("(max-width: 1023px)").matches) {
        getOffset(map)
    }  
}



