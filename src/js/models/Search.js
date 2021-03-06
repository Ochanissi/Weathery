import axios from "axios";
import { keyDarkSky, proxy } from "../config";

export default class Search {
  constructor(query_lat, query_long) {
    this.query_lat = query_lat;
    this.query_long = query_long;
  }

  async getResults() {
    try {
      const res = await axios(
        `${proxy}https://api.darksky.net/forecast/${keyDarkSky}/${this.query_lat},${this.query_long}?units=si&exclude=minutely,flags,alerts`
      );
      this.result = res.data;
      this.currently = res.data.currently;
      this.hourly = res.data.hourly.data;
      this.daily = res.data.daily.data;

      // console.log(res);
      // console.log(this.result);
      // console.log(this.result.currently);
      // console.log(this.result.hourly.data);
      // console.log(this.result.daily.data);
    } catch (error) {
      alert(error);
    }
  }

  changeUnits(bool) {
    if (bool) {
      // console.log(bool);

      this.currently.temperature = this.currently.temperature * 1.8 + 32;
      this.hourly.forEach(x => {
        x.temperature = x.temperature * 1.8 + 32;
      });

      this.currently.windSpeed *= 0.62137;

      this.daily.forEach(x => {
        x.windSpeed *= 0.62137;

        x.temperatureHigh = x.temperatureHigh * 1.8 + 32;
        x.temperatureLow = x.temperatureLow * 1.8 + 32;
      });
    } else {
      // console.log(bool);

      this.currently.temperature = (this.currently.temperature - 32) / 1.8;
      this.hourly.forEach(x => {
        x.temperature = (x.temperature - 32) / 1.8;
      });

      this.currently.windSpeed /= 0.62137;

      this.daily.forEach(x => {
        x.windSpeed /= 0.62137;

        x.temperatureHigh = (x.temperatureHigh - 32) / 1.8;
        x.temperatureLow = (x.temperatureLow - 32) / 1.8;
      });
    }
  }
}
