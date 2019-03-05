import { Component,  Input, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  chart = [];
  city: string;
  country: string;
  state: string;
  days: string;
  units: string;
  lang: string;

  datos: any;
  fechas: any;
  temperaturas: any;
  constructor(private _weather: WeatherService) {}

  ngOnInit() {
    this.city = 'OBREGON, MX';
    this.country = 'MX';
    this.state = 'SONORA';
    this.days = '15';
    this.units = 'M';
    this.lang = 'es';

    this.getDatos();
  }

  SeleccionaCiudad() {
   
    this.getDatos();

  }

getDatos(){
  this._weather.getDatos(this.city, this.country, this.state, this.days, this.units, this.lang )
  .subscribe(res => {
    
    this.datos = res['data'];
    
    let temp_max = res['data'].map(res => res.temp)
    //let temp_min = res['data'].map(res => res.app_min_temp)
    let alldates = res['data'].map(res => res.moonset_ts)
   
    this.fechas = res['data'].map(res => res.moonset_ts);
    this.temperaturas = res['data'].map(res => res.temp);

    console.log(this.fechas)
    let weatherDates = []
    alldates.forEach((res) => {
      let jsdate = new Date(res * 1000)
      weatherDates.push(jsdate.toLocaleTimeString('es', { year: 'numeric', month: 'short', day: 'numeric'}))
    })

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: weatherDates,
        datasets: [
          {
            data: temp_max,
            borderColor: '#3cba9f',
            fill: false
          },
         
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    })

  })

}


}
