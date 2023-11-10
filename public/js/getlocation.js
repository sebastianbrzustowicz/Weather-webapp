function getLocation(){
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  
  function successFunction(position) {
    localStorage.setItem("latitude", position.coords.latitude);
    localStorage.setItem("longitude", position.coords.longitude);
    location. reload()
  }
  
  function errorFunction() {
    console.log("Unable to retrieve your location.");
  }
}