let map;

let latitude = 19.337831425890258;
let longitude = -99.19726553942392;


// Attach your callback function to the `window` object
window.initMap = function () {
  
};


function loadScript() {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD68poS92lCMFoR3OnBCqZnaSJqrcFMc1U&callback=initialize';
    script.async = true;
    document.body.appendChild(script);
}

window.onload = loadScript;


function initialize() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: latitude,
            lng: longitude
        },
        zoom: 18,
    });

    var marker = new google.maps.Marker({
        position: {
            lat: latitude,
            lng: longitude
        },
        title: "ALTTO - San Ángel"
    });

    marker.setMap(map);
}

window.initMap = initMap;