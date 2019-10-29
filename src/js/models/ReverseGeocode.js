import axios from 'axios';
import { keyGoogleGeocode, proxy } from '../config';

export default class ReverseGeocode {
    constructor(query_lat, query_long) {
        this.query_lat = query_lat;
        this.query_long = query_long;
    }

    async getResults() {
        try {
            const res = await axios(`${proxy}https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.query_lat},${this.query_long}&key=${keyGoogleGeocode}`);
            // this.resLocationCity = res.data.results[0].address_components[0].long_name;
            // this.resLocationCountry = res.data.results[0].address_components[3].long_name;
            this.resLocation = res.data.results[0].formatted_address;
            this.resCoords = res.data.results[0].geometry.location;

            // console.log(res);
            // console.log(this.resLocation);
            // console.log(this.resLocationCity);
            // console.log(this.resLocationCountry);
            // console.log(this.resCoords);

        } catch (error) {
            alert(error);
        }
    }

}