import axios from 'axios';
import { keyGoogleGeocode, proxy } from '../config';

export default class Geocode {
    constructor(query_city) {
        this.query_city = query_city;
    }

    async getResults() {
        try {
            const res = await axios(`${proxy}https://maps.googleapis.com/maps/api/geocode/json?address=${this.query_city}&key=${keyGoogleGeocode}`);
            this.resLocationCity = res.data.results[0].address_components[0].long_name;
            this.resLocationCountry = res.data.results[0].address_components[3].long_name;
            this.resCoords = res.data.results[0].geometry.location;

            console.log(res);
            console.log(this.resLocationCity);
            console.log(this.resLocationCountry);
            console.log(this.resCoords);

        } catch (error) {
            alert(error);
        }
    }



    // async getResults() {
    //     try {
    //         const res = await axios(`${proxy}https://api.darksky.net/forecast/${key}/${this.query_lat},${this.query_long}?units=si&exclude=minutely,flags,alerts`);
    //         console.log(res);
    //         this.result = res.data;
    //         console.log(this.result);
    //         this.currently = res.data.currently;
    //         // console.log(this.result.currently);
    //         this.hourly = res.data.hourly.data;
    //         // console.log(this.result.hourly.data);
    //         this.daily = res.data.daily.data;
    //         console.log(this.result.daily.data);
    //     } catch (error) {
    //         alert(error);
    //     }
    // }



}

// function geocode() {
// var location = "22 Main st Boston MA";
// axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
//     params: {
//         address: location,
//         key: 'AIzaSyBOejuIMnoif-vg-a7KaoEyEXaLrS1yidQ'
//     }
// })
// .then(function(response) {
//     // Log full response
//     console.log(response);

//     // Formatted address
//     console.log(response.data.results[0].formatted_address);
//     var formattedAddress = response.data.results[0].formatted_address;
//     var formattedAddressOutput = `
//     <ul></ul>
//     `;

//     // Address components
//     var addressComponents = response.data.results[0].address_components;
//     var addressComponentsOutput = '<ul>';

//     // Geometry
//     var lat = response.data.results[0].geometry.location.lat;
//     var lng = response.data.results[0].geometry.location.lng;

//     var geometryOutput = `
//         <li></li>
//     `;

//     // Output to app
//     document.getElementById('formatted-address').innerHTML = formattedAddress
// })
// .catch(function(error) {
//     console.log(error);
// })
// }
