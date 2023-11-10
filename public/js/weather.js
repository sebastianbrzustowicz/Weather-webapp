export function getWeather(geocoding, timezone){
    var lat = geocoding.latitude;
    var lon = geocoding.longitude;
    var name = geocoding.name;
    var country = geocoding.country;

    return axios.get(
        "https://api.open-meteo.com/v1/forecast?current=temperature_2m,apparent_temperature,precipitation,snowfall,rain,weathercode,windspeed_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&timeformat=unixtime&timezone=auto", 
        {
            params:{
                latitude: lat,
                longitude: lon,
            },
        }
    )
    .then(({ data }) => {
        return{   
          country, 
          name,
          current: parseCurrentWeather(data),
          daily: parseDailyWeather(data),
          hourly: parseHourlyWeather(data)
        }
    })
}

function parseCurrentWeather(data){

    const currentTemp = data['current']['temperature_2m']
    const windSpeed = data['current']['windspeed_10m']
    const iconCode = data['current']['weathercode']
    const precip = data['current']['precipitation']
    const tempFeelsLike = data['current']['apparent_temperature']
    const snowFall = data['current']['snowfall']
    const city = data['timezone']
    const country = data['country']

    return{
        currentTemp: Math.round(currentTemp),
        tempFeelsLike: Math.round(tempFeelsLike),
        windSpeed: Math.round(windSpeed),
        precip: Math.round(precip * 100) / 100,
        snowFall: Math.round(snowFall),
        iconCode,
        city,
        country,
    }
}

function parseDailyWeather(data){

    return data.daily.time.map((time, index) =>{
        return {
            timestamp: time*1000,
            iconCode: data.daily.weathercode[index],
            maxTemp: Math.round(data.daily.temperature_2m_max[index]),
            minTemp: Math.round(data.daily.temperature_2m_min[index])
        }
    })
}

function parseHourlyWeather(data){
    const HourlyTemp = data.hourly.temperature_2m;
    const HourlyIcon = data.hourly.weathercode;

    return {
        HourlyTemp,
        HourlyIcon,
    }
}