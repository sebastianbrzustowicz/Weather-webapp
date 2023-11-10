export function renderImage(id, code){
    switch(code) {
        case 0:
            $("#"+id).attr("src", "/images/sun.png");
            break;
        case 1: case 2: case 3:
            $("#"+id).attr("src", "/images/mainly-clear.png");
            break;
        case 45: case 48:
            $("#"+id).attr("src", "/images/fog.png");
            break;
        case 51: case 51: case 53: case 55: case 56: case 57:
            $("#"+id).attr("src", "/images/snow.png");
            break;
        case 61: case 63: case 65: case 80: case 81: case 82:
            $("#"+id).attr("src", "/images/rainy.png");
            break;
        case 66: case 67: 
            $("#"+id).attr("src", "/images/snow-rain.png");
            break;
        case 71: case 73: case 75: case 77: case 85: case 86:
            $("#"+id).attr("src", "/images/cloud-snow.png");
            break;
        case 95: case 96: case 99:
            $("#"+id).attr("src", "/images/storm.png");
            break;
        default:
            $("#"+id).attr("src", "/images/blank.png");
            break;
      }
}

export function renderTitle(id, code){
    switch(code) {
        case 0:
            $("#"+id).html("Sunny");
            break;
        case 1: case 2: case 3:
            $("#"+id).html("Partly cloudy");
            break;
        case 45: case 48:
            $("#"+id).html("Fog");
            break;
        case 51: case 51: case 53: case 55: case 56: case 57:
            $("#"+id).html("Drizzle");
            break;
        case 61: case 63: case 65: case 80: case 81: case 82:
            $("#"+id).html("Rain");
            break;
        case 66: case 67:
            $("#"+id).html("Freezing rain");
            break;
        case 71: case 73: case 75: case 77: case 85: case 86:
            $("#"+id).html("Snow");
            break;
        case 95: case 96: case 99:
            $("#"+id).html("Storm");
            break;
        default:
            $("#"+id).html("Sunny");
            break;
      }
}