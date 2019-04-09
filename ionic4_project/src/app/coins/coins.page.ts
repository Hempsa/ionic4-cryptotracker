import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Chart } from 'chart.js'; // Import charts.js
import { Coin } from '../coin';
import { Global } from '../global';
import { PopoverController } from '@ionic/angular';
import { CoinsPopoverComponent } from '../coins-popover/coins-popover.component'
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.page.html',
  styleUrls: ['./coins.page.scss', '../common.scss'],
})
export class CoinsPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;

  global: Global;
  coins: Coin[] = []; /* declare coins as array */

  doughnutChart: any; /* declare doughnutChart */

  constructor(private apiService: ApiService, private popoverController: PopoverController) {
    this.apiService.getCoins().subscribe(data => {
      this.coins = data;
      this.apiService.getGlobal().subscribe(data => {
        this.global = data;
        this.drawChart();
      });// Loading the Data
    });

  }

  /**
   * Shows popover menu for selected coin
   * @param coin Coin
   */
  async showPopover(coin: Coin) {
    const popoverElement = await this.popoverController.create({
      component: CoinsPopoverComponent,
      componentProps: {
        data: coin
      }
    });
    return await popoverElement.present();
  }

  drawChart() {
    let values = [];  //doughnutChart values
    let labels = [];  //doughnutChart labels

    for (let i = 0; i < this.coins.length; i++) {
      if (this.coins[i].rank < 7) {
        labels.push(this.coins[i].name);
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
            'rgb(209, 0, 44)',
            'rgb(0, 80, 209)',
            'rgb(0, 209, 59)',
            'rgb(0, 209, 174)',
            'rgb(125, 0, 209)',
            'rgb(209, 0, 174)'
          ],
          backgroundColor: [
            'rgb(209, 0, 44)',
            'rgb(0, 80, 209)',
            'rgb(0, 209, 59)',
            'rgb(0, 209, 174)',
            'rgb(125, 0, 209)',
            'rgb(209, 0, 174)'
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
          labels: {
            fontColor: 'white'
          }
        }
      }
    });
  }
}
