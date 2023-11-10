export function search(city){
    if (city === undefined) {var city = 'Warsaw';}
    
    return axios.get(
        "https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json", 
        {
            params:{
                name: city,
            },
        }
    )
    .then(({ data }) => {

        if (data["results"] !== undefined) {

        var latitude = data.results[0].latitude;
        var longitude = data.results[0].longitude;
        var name = data.results[0].name;
        var country = data.results[0].country;
        var timezone = data.results[0].timezone;
        
        return{
            latitude,
            longitude,
            name,
            country,
            timezone
        }
        }else{
            var city = 'Warsaw';
            return axios.get(
                "https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json", 
                {
                    params:{
                        name: city,
                    },
                }
            )
            .then(({ data }) => {
        
                var latitude = data.results[0].latitude;
                var longitude = data.results[0].longitude;
                var name = data.results[0].name;
                var country = data.results[0].country;
                var timezone = data.results[0].timezone;
                
                return{
                    latitude,
                    longitude,
                    name,
                    country,
                    timezone
                }
            })
        }
    })
}