import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { PortfolioObject } from '../portfolio-object';
import { ApiService } from '../api.service';
import { Coin } from '../coin';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss', '../common.scss'],
})
export class PortfolioPage {

  coins: Coin[];
  portfolio: PortfolioObject[] = [];

  constructor(private storageService: StorageService, private apiService: ApiService) {
    this.apiService.getCoins().subscribe(data => {
      this.coins = data;
    });
  }

  ionViewDidEnter() {
    this.storageService.get('portfolio').then(data => {
      this.portfolio = data;
      this.portfolio.forEach(portfolioObject => {
        var coin = this.getCoin(portfolioObject.id);
        if(coin != null) {
          // Update object
          portfolioObject.price_usd_now = coin.price_usd;
          var increase = (portfolioObject.price_usd_now / portfolioObject.price_usd_when_added) * 100;
          portfolioObject.price_increase_percentage = increase.toFixed(2);
        }
      });
    });
  }

  getCoin(id: string): Coin {
    var ret: Coin;
    this.coins.forEach(coin => {
      if(coin.id == id) {
        ret = coin;
      }
    });
    return ret;
  }

}
