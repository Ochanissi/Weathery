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
            console.log(this.result.daily.data);
        } catch (error) {
            alert(error);
        }
    }

    changeUnits(bool) {
        if (bool) {
            // console.log(bool);

            this.currently.temperature = this.currently.temperature * 9 / 5 + 32;
            this.hourly.forEach(x => {
                x.temperature = x.temperature *  1.8 + 32;
            });
            // console.log(this.hourly[0].temperature);

            this.currently.windSpeed *= 0.62137;


            // console.log('1          ' + this.daily[0].windSpeed);
            
            this.daily.forEach(x => {
                x.windSpeed *= 0.62137;

                x.temperatureHigh = x.temperatureHigh *  1.8 + 32;
                x.temperatureLow = x.temperatureLow *  1.8 + 32;
            });


        } else {
            // console.log(bool);

            this.currently.temperature = (this.currently.temperature - 32) / 9 / 5;
            this.hourly.forEach(x => {
                x.temperature = (x.temperature - 32) / 1.8;
            });
            // console.log(this.hourly[0].temperature);

            this.currently.windSpeed /= 0.62137;



            // console.log('2          ' + this.daily[0].windSpeed);


            this.daily.forEach(x => {
                x.windSpeed /= 0.62137;

                x.temperatureHigh = (x.temperatureHigh - 32) / 9 / 5;
                x.temperatureLow = (x.temperatureLow - 32) / 9 / 5;
            });

        }

    }
}



