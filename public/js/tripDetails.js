$(document).ready(function () {

    var cid = getParams('cid');
    var socket = io();

    setInterval(function () {
        socket.emit("updateTripLatLng", {cid: cid, lat: getRandomInRange(-180, 180, 3), lng: getRandomInRange(-180, 180, 3)});
    }, 3000);



//     socket.on('updateTripLatLng', function () {
//
//    });

//    socket.on('img', function (data) {
//        img = data;
//    });

});

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function getParams(name)
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}