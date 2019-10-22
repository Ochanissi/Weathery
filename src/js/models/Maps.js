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

    infoWindow.setPosition();
});


export const addMarker = coords => {
    new google.maps.Marker({
        position: coords,
        map: map
})
    infoWindow.setPosition(coords);
    map.setCenter(coords);
    infoWindow.setContent('<h2>Searched Location</h2>');
    infoWindow.open(map);
    console.log(coords);
};

// ----------------------------


const infoWindow = new google.maps.InfoWindow();
const infoWindowHome = new google.maps.InfoWindow();


if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(p => {
        const position = {
            lat: p.coords.latitude,
            lng: p.coords.longitude
        };
        infoWindowHome.setPosition(position);
        infoWindowHome.setContent('<h1>Your Location!</h1>');
        infoWindowHome.open(map);
        // console.log(position);
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
