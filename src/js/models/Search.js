import axios from 'axios';

export default class Search {
    constructor(query_lat, query_long) {
        this.query_lat = query_lat;
        this.query_long = query_long;
    }

    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '985bae1e1ba4fca94db72ba79093602d';
        try {
            const res = await axios(`${proxy}https://api.darksky.net/forecast/${key}/${this.query_lat},${this.query_long}?units=si`);
            console.log(res);
            this.result = res.data.hourly.data;
            console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}



