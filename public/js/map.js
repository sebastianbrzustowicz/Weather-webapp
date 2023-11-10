import {getWeather} from "./weather.js"
import {search} from "./search.js"

if (localStorage.getItem("latitude") === null){
    if (localStorage.getItem("city0") === null) {
        localStorage.setItem("city0", "Warsaw");
    }else{
    var city = localStorage.getItem("city0");}
    
    search(city).then((res)=>{
        getWeather(res, res.timezone).then(renderMapWeather)
        .catch(e => {
            console.error(e)
            alert("Error getting weather.")
        })
    })
}else{
    let res = {
        latitude: localStorage.getItem("latitude"),
        longitude: localStorage.getItem("longitude"),
        timezone: "World",
      };
    getWeather(res, res.timezone).then(renderMapWeather)
        .catch(e => {
            console.error(e)
            alert("Error getting weather.")
        })
}


var MyMap = new google.maps.Map(document.getElementById("mapID"), {
    zoom: 6,
    center: new google.maps.LatLng(52, 19.2),
    mapTypeId: google.maps.MapTypeId.ROADMAP
 });

let marker = new google.maps.Marker({
    position: new google.maps.LatLng(52.41508055735535, 16.931328606605533),
    map: MyMap,
    draggable: true,
    animation: google.maps.Animation.DROP,
});

var infowindow = new google.maps.InfoWindow();
infowindow.setContent("<div class='ui header' style='color:black;'>Drag me to your position!</div>");
infowindow.open(MyMap, marker);

google.maps.event.addListener(marker, "click", () => {
    infowindow.open(MyMap, marker);
});

google.maps.event.addListener(marker, "mouseup", () => {
    var lat_marker = Math.round(marker.getPosition().lat()*1000000)/1000000
    var lon_marker = Math.round(marker.getPosition().lng()*1000000)/1000000
    infowindow.setContent(`<div class='ui header' style='color:black;margin:auto;'>Coord x: `+lon_marker+`<br>Coord y: `+lat_marker+`<br><br><div style='text-align:center;'><form onsubmit="localStorage.setItem('longitude', `+lon_marker+`);localStorage.setItem('latitude', `+lat_marker+`);"><input type='submit' value='Select position' style='width: 100%;background-color:rgb(39,48,63);color:white;border-radius:15px; cursor:pointer;'></form></div></div>`);
 });

 function renderMapWeather({ name, country, current, daily, hourly }) {
    renderMapWeatherCurrent(name, country, current)
}

function renderImage(id, code){
    switch(code) {
        case 0: case 1: case 2: case 3:
            $("#"+id).attr("src", "/images/sun.png");
            break;
        case 45: case 48: case 51: case 51: case 53: case 55: case 56: case 57:
            $("#"+id).attr("src", "/images/fog.png");
            break;
        case 61: case 63: case 65: case 66: case 67: case 80: case 81: case 82:
            $("#"+id).attr("src", "/images/rainy.png");
            break;
        case 71: case 73: case 75: case 77: case 85: case 86:
            $("#"+id).attr("src", "/images/snow.png");
            break;
        case 95: case 96: case 99:
            $("#"+id).attr("src", "/images/storm.png");
            break;
        default:
            $("#"+id).attr("src", "/images/blank.png");
            break;
      }
}

function renderMapWeatherCurrent(name, country, current){
    if (localStorage.getItem("latitude") === null){
    $("#data-city").html(name +", ");
    $("#data-country").html(country);}
    else{
    $("#data-city").html(Math.round(localStorage.getItem("latitude")*1000000)/1000000+", ");
    $("#data-country").html(Math.round(localStorage.getItem("longitude")*1000000)/1000000);
    }

    // units conversion
    if (localStorage.getItem("setting0")=='°F'){
        current.currentTemp = Math.round(current.currentTemp*9/5+32);
        current.tempFeelsLike = Math.round(current.tempFeelsLike*9/5+32);}
    if (localStorage.getItem("setting1")=='m/s'){
        current.windSpeed = Math.round(current.windSpeed*1000/3600);}
    if (localStorage.getItem("setting2")=='in'){
        current.precip = Math.round(current.precip/25.4);}

    $("#data-map-precip").html("Precipitation sum: " + current.precip + " " + localStorage.getItem("setting2"));
    $("#data-map-currentTemp").html(current.currentTemp + localStorage.getItem("setting0"));
    renderImage("data-map-currentIcon", current.iconCode)
    $("#data-map-realFeel").html(current.tempFeelsLike + localStorage.getItem("setting0"));
    $("#data-map-precipCondition").html(current.precip + " " + localStorage.getItem("setting2"));
    $("#data-map-wind").html(current.windSpeed + " " + localStorage.getItem("setting1"));
    $("#data-map-snowfall").html(current.snowFall + '%');
}