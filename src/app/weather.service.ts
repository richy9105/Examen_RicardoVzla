import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class WeatherService {

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get("https://api.weatherbit.io/v2.0/forecast/daily?city=OBREGON%2C%20MX&country=MX&state=SONORA&days=15&units=M&lang=es&key=6a180e78540d4584a3176f0e9322a71d")
      .map(result => result);
  }

  private api = 'https://api.weatherbit.io/v2.0/forecast/daily?';

    private key = '6a180e78540d4584a3176f0e9322a71d';

    extractData;


    getDatos(city, country, state, days, units, lang ) {

        return this._http.get(this.api
        + 'city=' + city
        + '&country=' + country
        + '&state=' + state
        + '&days=' + days
        + '&units=' + units
        + '&lang=' + lang
        + '&key=' + this.key ).map(result => result);;
      }

  

}
