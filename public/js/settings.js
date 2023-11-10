$('#settings-left-0').click(function() { updateSettings(0); });
$("#settings-right-0").click(function() { updateSettings(1) });
$('#settings-left-1').click(function() { updateSettings(2); });
$("#settings-right-1").click(function() { updateSettings(3) });
$('#settings-left-2').click(function() { updateSettings(4); });
$("#settings-right-2").click(function() { updateSettings(5) });

//reading settings from localStorage
if (localStorage.getItem('setting0')=='°C'){
    $("#settings-left-0").css({"background-color":"rgb(39,48,63)","opacity":"1"});
}
if (localStorage.getItem('setting0')=='°F'){
    $('#settings-right-0').css({'background-color':'rgb(39,48,63)','opacity':'1'});
}
if (localStorage.getItem('setting1')=='km/h'){
    $("#settings-left-1").css({"background-color":"rgb(39,48,63)","opacity":"1"})
}
if (localStorage.getItem('setting1')=='m/s'){
    $('#settings-right-1').css({'background-color':'rgb(39,48,63)','opacity':'1'});
}
if (localStorage.getItem('setting2')=='mm'){
    $("#settings-left-2").css({"background-color":"rgb(39,48,63)","opacity":"1"})
}
if (localStorage.getItem('setting2')=='in'){
    $("#settings-right-2").css({"background-color":"rgb(39,48,63)","opacity":"1"})
}

function updateSettings(num){
    if (num == 0){
        $("#settings-left-0").css({"background-color":"rgb(39,48,63)","opacity":"100%"});
        $("#settings-right-0").css({"background-color":"rgb(12,20,28)","opacity":"40%"});
        localStorage.setItem("setting0", "°C")
    }
    if (num == 1){
        $("#settings-left-0").css({"background-color":"rgb(12,20,28)","opacity":"40%"});
        $("#settings-right-0").css({"background-color":"rgb(39,48,63)","opacity":"100%"});
        localStorage.setItem("setting0", "°F")
    }
    if (num == 2){
        $("#settings-left-1").css({"background-color":"rgb(39,48,63)","opacity":"100%"});
        $("#settings-right-1").css({"background-color":"rgb(12,20,28)","opacity":"40%"});
        localStorage.setItem("setting1", "km/h")
    }
    if (num == 3){
        $("#settings-left-1").css({"background-color":"rgb(12,20,28)","opacity":"40%"});
        $("#settings-right-1").css({"background-color":"rgb(39,48,63)","opacity":"100%"});
        localStorage.setItem("setting1", "m/s")
    }
    if (num == 4){
        $("#settings-left-2").css({"background-color":"rgb(39,48,63)","opacity":"100%"});
        $("#settings-right-2").css({"background-color":"rgb(12,20,28)","opacity":"40%"});
        localStorage.setItem("setting2", "mm")
    }
    if (num == 5){
        $("#settings-left-2").css({"background-color":"rgb(12,20,28)","opacity":"40%"});
        $("#settings-right-2").css({"background-color":"rgb(39,48,63)","opacity":"100%"});
        localStorage.setItem("setting2", "in")
    }
}