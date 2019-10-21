import { state } from '../index';
import { elements } from '../views/base';

export const myLatLng  = new google.maps.LatLng(44.439663, 26.096306);

// Map options
export const options = {
    zoom: 5,
    center: myLatLng
}


// New map
const map = new google.maps.Map(elements.maps, options);

// Listen for click on map
google.maps.event.addListener(map, 'click', e => {
    // Add marker
    addMarker(e.latLng);

});


export const addMarker = coords => new google.maps.Marker({
    position: coords,
    map: map
});

// ----------------------------


const infoWindow = new google.maps.InfoWindow();

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(p => {
        const position = {
            lat: p.coords.latitude,
            lng: p.coords.longitude
        };
        infoWindow.setPosition(position);
        infoWindow.setContent('<h1>Your Location!</h1>');
        infoWindow.open(map);
    }, () => {
        handleLocationError('Geolocation service failed', map.center());
    })
} else {
    handleLocationError('No geolocation available', map.center());
}


const handleLocationError = (content, position) => {
    infoWindow.setPosition(position);
    infoWindow.setContent(content);
    infoWindow.open(map);
}
