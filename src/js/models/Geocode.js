import axios from 'axios';
import { keyGoogleGeocode, proxy } from '../config';

export default class Geocode {
    constructor(query_city) {
        this.query_city = query_city;
    }

    async getResults() {
        try {
            const res = await axios(`${proxy}https://maps.googleapis.com/maps/api/geocode/json?address=${this.query_city}&key=${keyGoogleGeocode}`);
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