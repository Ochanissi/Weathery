import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
    constructor(query_lat, query_long) {
        this.query_lat = query_lat;
        this.query_long = query_long;
    }

    async getResults() {
        try {
            const res = await axios(`${proxy}https://api.darksky.net/forecast/${key}/${this.query_lat},${this.query_long}?units=si&exclude=minutely,flags,alerts`);
            // console.log(res);
            this.result = res.data;
            // console.log(this.result);
            this.currently = res.data.currently;
            console.log(this.result.currently);
            this.hourly = res.data.hourly.data;
            // console.log(this.result.hourly.data);
            this.daily = res.data.daily.data;
            // console.log(this.result.daily.data);
        } catch (error) {
            alert(error);
        }
    }
}



