import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Chart } from 'chart.js'; // Import charts.js
import { Coin } from '../coin';
import { Global } from '../global';
import { PopoverController } from '@ionic/angular';
import { CoinmanagementPopoverComponent } from '../coinmanagement-popover/coinmanagement-popover.component';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.page.html',
  styleUrls: ['./coins.page.scss', '../common.scss'],
})
export class CoinsPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;

  marketSharePanelVisible: boolean = false; // Change to true to have marketshare section be visible by default

  global: Global;
  visibleCoins: Coin[] = []; /* Coins that are visible after filtering */
  coins: Coin[] = []; /* declare coins as array */

  doughnutChart: any; /* declare doughnutChart */

  constructor(private apiService: ApiService, private popoverController: PopoverController) {
    this.apiService.getCoins().subscribe(data => {
      this.coins = data;
      this.visibleCoins = data;
      this.apiService.getGlobal().subscribe(data => {
        this.global = data;
        this.drawChart();
      }); // Loading the Data
    });

  }

  /**
   * Shows popover menu for selected coin
   * @param coin Coin
   */
  async showPopover(coin: Coin) {
    const popoverElement = await this.popoverController.create({
      component: CoinmanagementPopoverComponent,
      componentProps: {
        source: 'page.coins',
        object: coin
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
          labels: {
            fontColor: 'white'
          }
        }
      }
    });
  }

  isMarketSharePanelVisible() {
    return this.marketSharePanelVisible;
  }

  toggleMarketSharePanelVisibility() {
    this.marketSharePanelVisible = !this.marketSharePanelVisible;
  }

  getClickToShowTextIfAny(): string {
    return this.marketSharePanelVisible ? '' : '(Click to show)';
  }

  doFilter(event) {
    var filterInput = event.detail.value.toLowerCase();
    this.visibleCoins = [];
    this.coins.forEach(coin => {
      var name = coin.name.toLowerCase();
      var symbol = coin.symbol.toLowerCase();
      if (filterInput.length == 0
        || name.indexOf(filterInput) >= 0
        || symbol == filterInput) {
        this.visibleCoins.push(coin);
      }
    });
  }

}
