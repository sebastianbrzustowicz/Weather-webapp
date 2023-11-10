import {getWeather} from "./weather.js"
import {search} from "./search.js"
import {renderImage} from "./rendering.js"
import {renderTitle} from "./rendering.js"

if (localStorage.getItem("latitude") === null){
    if (localStorage.getItem("city0") === null) {
        localStorage.setItem("city0", "Warsaw");
    }else{
    var city = localStorage.getItem("city0");}
    
    search(city).then((res)=>{
        getWeather(res, res.timezone).then(renderWeather)
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
    getWeather(res, res.timezone).then(renderWeather)
        .catch(e => {
            console.error(e)
            alert("Error getting weather.")
        })
}

function renderWeather({ name, country, current, daily, hourly }) {
    renderCurrentWeather(name, country, current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)
}

function renderCurrentWeather(name, country, current){
    if (localStorage.getItem("latitude") === null){
        $("#data-city").append(name + ", ");
        $("#data-country").append(country);}
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

    $("#data-precip").html("Precipitation sum: "+current.precip+" "+localStorage.getItem("setting2"));
    $("#data-currentTemp").html(current.currentTemp+localStorage.getItem("setting0"));
    renderImage("data-currentIcon", current.iconCode)
    $('#data-realFeel').html(current.tempFeelsLike+localStorage.getItem("setting0"));
    $('#data-precipCondition').html(current.precip+' '+localStorage.getItem("setting2"));
    $('#data-wind').html(current.windSpeed+' '+localStorage.getItem("setting1"));
    $('#data-snowfall').html(current.snowFall+'%');
}

function renderDailyWeather(daily){
    //7-day forecast
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var weekday = []
    for (var i = 0; i < 7; ++i) {
        var date = new Date();
        date.setDate(date.getDate()+i);
        weekday[i] = weekdays[date.getDay()]
        // units conversion
        if (localStorage.getItem("setting0")=='°F'){
            daily[i].maxTemp = Math.round(daily[i].maxTemp*9/5+32);
            daily[i].minTemp = Math.round(daily[i].minTemp*9/5+32);}

        $("#data-7-day-"+i).html(weekday[i]);
        renderImage("data-7-icon-"+i, daily[i].iconCode)
        renderTitle("data-7-title-"+i, daily[i].iconCode)
        $('#data-7-max-'+i).html(daily[i].maxTemp+localStorage.getItem("setting0"));
        $('#data-7-min-'+i).html("/"+daily[i].minTemp+localStorage.getItem("setting0"));
    }
}

function renderHourlyWeather(hourly){
    //today's forecast
    const temps =  [Math.round(hourly.HourlyTemp[6]),Math.round(hourly.HourlyTemp[9]),Math.round(hourly.HourlyTemp[12]),Math.round(hourly.HourlyTemp[15]),Math.round(hourly.HourlyTemp[18]),Math.round(hourly.HourlyTemp[21])]
    const icons =  [Math.round(hourly.HourlyIcon[6]),Math.round(hourly.HourlyIcon[9]),Math.round(hourly.HourlyIcon[12]),Math.round(hourly.HourlyIcon[15]),Math.round(hourly.HourlyIcon[18]),Math.round(hourly.HourlyIcon[21])]


    for (var i = 0; i < 6; ++i) {
        // units conversion
        if (localStorage.getItem("setting0")=='°F'){
            temps[i] = Math.round(temps[i]*9/5+32);}
        $("#data-today-temp-"+i).html(temps[i]+localStorage.getItem("setting0"));
        $("#data-today-icon-"+i).css("visibility","visible");
        renderImage("data-today-icon-"+i, icons[i])
    }
}