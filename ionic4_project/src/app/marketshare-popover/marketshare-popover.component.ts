import { Component, OnInit, ViewChild } from '@angular/core';
import { Global } from '../global';
import { ApiService } from '../api.service';
import { Chart } from 'chart.js'; // Import charts.js
import { NavParams } from '@ionic/angular';
import { Coin } from '../coin';

@Component({
  selector: 'app-marketshare-popover',
  templateUrl: './marketshare-popover.component.html',
  styleUrls: ['./marketshare-popover.component.scss'],
})
export class MarketsharePopoverComponent {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any; /* declare doughnutChart */

  coins: Coin[];
  global: Global;

  constructor(private navParams: NavParams, private apiService: ApiService) {
    this.coins = navParams.get('coins');
  }

  ionViewDidEnter() {
    this.apiService.getGlobal().subscribe(data => {
      this.global = data;
      this.drawChart();
    });
  }

  drawChart() {
    let values = [];  //doughnutChart values
    let labels = [];  //doughnutChart labels

    for (let i = 0; i < this.coins.length; i++) {
      if (this.coins[i].rank < 7) {
        labels.push(this.coins[i].name + ' ' +(this.coins[i].market_cap_usd / this.global.total_market_cap_usd * 100).toFixed(2)+'%');
        var mshare = this.coins[i].market_cap_usd / this.global.total_market_cap_usd * 100;
        values.push(mshare.toFixed(2));
      }
    }
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          borderColor: [
            '#FF6859',
            '#72DEFF',
            '#045D56',
            '#1EB980',
            '#B15DFF',
            '#FFCF44'
          ],
          backgroundColor: [
            '#FF6859',
            '#72DEFF',
            '#045D56',
            '#1EB980',
            '#B15DFF',
            '#FFCF44'
          ],
          hoverBackgroundColor: [
            'rgba(209, 0, 44, 0.2)',
            'rgba(0, 80, 209, 0.2)',
            'rgba(0, 209, 59, 0.2)',
            'rgba(0, 209, 174, 0.2)',
            'rgba(125, 0, 209, 0.2)',
            'rgba(209, 0, 174, 0.2)'
          ]
        }]
      },
      options: {
        legend: {
          position: 'left',
          labels: {
            fontColor: 'white'
          }
        }
      }
    });
  }
}
