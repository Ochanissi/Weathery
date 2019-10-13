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
            console.log(res);
            this.result = res.data;
            console.log(this.result);
            this.currently = res.data.currently;
            // console.log(this.result.currently);
            this.hourly = res.data.hourly.data;
            // console.log(this.result.hourly.data);
            this.daily = res.data.daily.data;
            // console.log(this.result.daily.data);
        } catch (error) {
            alert(error);
        }
    }

    changeUnits(bool) {
        if (bool) {
            console.log(bool);

            this.currently.temperature = this.currently.temperature * 9 / 5 + 32;
            this.hourly.forEach(x => {
                x.temperature = x.temperature *  1.8 + 32;
            });
            console.log(this.hourly[0].temperature);

        } else {
            console.log(bool);

            this.currently.temperature = (this.currently.temperature - 32) / 9 / 5;
            this.hourly.forEach(x => {
                x.temperature = (x.temperature - 32) / 1.8;
            });

            console.log(this.hourly[0].temperature);
        }



        // // Degrees
        // const newDegreesCurrently = this.currently.temperature * 9 / 5 + 32;
        // const newDegreesHourly = this.hourly.temperature.map((x, i) => x[i].temperature  * 9 / 5 + 32);

        // // Speed
        // const newSpeedCurrently = this.currently.windSpeed * 0.62137;
        // const newSpeedHourly = this.hourly.windSpeed * 0.62137;

        // this.currently.temperature = newDegreesCurrently;
        // this.hourly.temperature = newDegreesHourly;

        // this.currently.windSpeed = newSpeedCurrently;
        // this.hourly.windSpeed = newSpeedHourly;
        
        // console.log(this.currently.temperature);
        // console.log(this.hourly.temperature);
        // console.log(this.currently.windSpeed);
        // console.log(this.hourly.windSpeed);

    }
}



