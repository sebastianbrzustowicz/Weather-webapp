import {getWeather} from "./weather.js"
import {search} from "./search.js"
import {renderImage} from "./rendering.js"

for (var i = 0; i < 6; ++i) {
if (localStorage.getItem("city"+i) === null) {
    $('#cities-tab-'+i).hide()}
    //document.getElementById("cities-tab-"+i).setAttribute("style", "display:none")}
    else{
    $('#cities-tab-'+i).show()
    
    //document.getElementById("cities-tab-"+i).setAttribute("style", "display:block");
    $('#history-static-left').css('display', 'inline-block').css('position', 'absolute').css('left', 20);
    $('#history-static-right').css('display', 'inline-block').css('position', 'absolute').css('left', '220px').css('width', '200px');
    cityTabCall(localStorage.getItem("city"+i),i)
    
    }
}

function cityTabCall(cityName,num){
    
    search(cityName).then((res)=>{
        getWeather(res, res.timezone).then((result)=> {

            // units conversion
            if (localStorage.getItem("setting0")=='°F'){
                result.current.currentTemp = Math.round(result.current.currentTemp*9/5+32);
                result.current.tempFeelsLike = Math.round(result.current.tempFeelsLike*9/5+32);}
            if (localStorage.getItem("setting1")=='m/s'){
                result.current.windSpeed = Math.round(result.current.windSpeed*1000/3600);}
            if (localStorage.getItem("setting2")=='in'){
                result.current.precip = Math.round(result.current.precip/25.4);}
            
            $("#cities-temp-"+num).html(result.current.currentTemp+localStorage.getItem("setting0"));
            renderImage("cities-icon-"+num, result.current.iconCode)
            $("#cities-title-"+num).html(localStorage.getItem("city"+num)+", "+result.country);
            if (num==0 && localStorage.getItem("latitude") === null){
                $('#city-horizontal-line').css("visibility","visible")
                $('#data-history-city').append(result.name+", ");
                $('#data-history-country').append(result.country);
                $('#data-history-precip').append("Precipitation sum: "+result.current.precip+" "+localStorage.getItem("setting2"));
                $('#data-history-temp').append(result.current.currentTemp+localStorage.getItem("setting0"));
                $('#data-history-realFeel').append(result.current.tempFeelsLike+localStorage.getItem("setting0"));
                $('#data-history-wind').append(result.current.windSpeed+" "+localStorage.getItem("setting1"));
                $('#data-history-precipCond').append(result.current.precip+" "+localStorage.getItem("setting2"));
                $('#data-history-snowfall').append(result.current.snowFall+"%");
                renderImage("data-history-currentIcon", result.current.iconCode);
            }
        }
        )
        .catch(e => {
            console.error(e)
            alert("Error getting weather.")
        })
    })

}

$("#cities-tab-0").click(function() {updateFromHistory("city0");});
$("#cities-tab-1").click(function() {updateFromHistory("city1");});
$("#cities-tab-2").click(function() {updateFromHistory("city2");});
$("#cities-tab-3").click(function() {updateFromHistory("city3");});
$("#cities-tab-4").click(function() {updateFromHistory("city4");});
$("#cities-tab-5").click(function() {updateFromHistory("city5");});

function updateFromHistory(historicCity){
    search(localStorage.getItem(historicCity)).then((res)=>{
        getWeather(res, res.timezone).then((result)=> {

                // units conversion
                if (localStorage.getItem("setting0")=='°F'){
                    result.current.currentTemp = Math.round(result.current.currentTemp*9/5+32);
                    result.current.tempFeelsLike = Math.round(result.current.tempFeelsLike*9/5+32);}
                if (localStorage.getItem("setting1")=='m/s'){
                    result.current.windSpeed = Math.round(result.current.windSpeed*1000/3600);}
                if (localStorage.getItem("setting2")=='in'){
                    result.current.precip = Math.round(result.current.precip/25.4);}

                localStorage.removeItem("latitude");
                localStorage.removeItem("longitude");
                $('#city-horizontal-line').css("visibility","visible")
                $('#data-history-city').html(result.name+", ");
                $('#data-history-country').html(result.country);
                $('#data-history-precip').html("Precipitation sum: "+result.current.precip+" "+localStorage.getItem("setting2"));
                $('#data-history-temp').html(result.current.currentTemp+localStorage.getItem("setting0"));
                $('#data-history-realFeel').html(result.current.tempFeelsLike+localStorage.getItem("setting0"));
                $('#data-history-wind').html(result.current.windSpeed+" "+localStorage.getItem("setting1"));
                $('#data-history-precipCond').html(result.current.precip+" "+localStorage.getItem("setting2"));
                $('#data-history-snowfall').html(result.current.snowFall+"%");
                renderImage("data-history-currentIcon", result.current.iconCode);
        }
        )
        .catch(e => {
            console.error(e)
            alert("Error getting weather.")
        })
    })
}

if (localStorage.getItem("latitude") === null){}else{
    var res = {}
    res.latitude = localStorage.getItem("latitude");
    res.longitude = localStorage.getItem("longitude");
    getWeather(res, res.timezone).then((result)=> {

            // units conversion
            if (localStorage.getItem("setting0")=='°F'){
                result.current.currentTemp = Math.round(result.current.currentTemp*9/5+32);
                result.current.tempFeelsLike = Math.round(result.current.tempFeelsLike*9/5+32);}
            if (localStorage.getItem("setting1")=='m/s'){
                result.current.windSpeed = Math.round(result.current.windSpeed*1000/3600);}
            if (localStorage.getItem("setting2")=='in'){
                result.current.precip = Math.round(result.current.precip/25.4);}
            $('#city-horizontal-line').css("visibility","visible")
            $('#history-static-left').css('display', 'inline-block').css('position', 'absolute').css('left', '20px');
            $('#history-static-right').css('display', 'inline-block').css('position', 'absolute').css('left', '220px').css('width', '200px');            
            $('#data-history-city').html(res.latitude + ', ');
            $('#data-history-country').html(res.longitude);
            $('#data-history-precip').html('Precipitation sum: ' + result.current.precip + ' ' + localStorage.getItem("setting2"));
            $('#data-history-temp').html(result.current.currentTemp + localStorage.getItem("setting0"));
            $('#data-history-realFeel').html(result.current.tempFeelsLike + localStorage.getItem("setting0"));
            $('#data-history-wind').html(result.current.windSpeed + ' ' + localStorage.getItem("setting1"));
            $('#data-history-precipCond').html(result.current.precip + ' ' + localStorage.getItem("setting2"));
            $('#data-history-snowfall').html(result.current.snowFall + '%');
            renderImage("data-history-currentIcon", result.current.iconCode);
    }
    )
    .catch(e => {
        console.error(e)
        alert("Error getting weather.")
    })
}