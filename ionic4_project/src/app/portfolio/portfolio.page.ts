import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { PortfolioObject } from '../portfolio-object';
import { ApiService } from '../api.service';
import { Coin } from '../coin';
import { PopoverController } from '@ionic/angular';
import { CoinmanagementPopoverComponent } from '../coinmanagement-popover/coinmanagement-popover.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss', '../common.scss'],
})
export class PortfolioPage {

  coins: Coin[];
  portfolio: PortfolioObject[] = [];

  constructor(private popoverController: PopoverController, private storageService: StorageService, private apiService: ApiService) {
    this.apiService.getCoins().subscribe(data => {
      this.coins = data;
    });
  }

  async showPopover(portfolioObject: PortfolioObject) {
    const popoverElement = await this.popoverController.create({
      component: CoinmanagementPopoverComponent,
      componentProps: {
        source: 'page.portfolio',
        portfolioObject: portfolioObject
      }
    });
    popoverElement.onWillDismiss().then(() => {
      this.ionViewDidEnter();
    });
    return await popoverElement.present();
  }

  ionViewDidEnter() {
    this.storageService.get('portfolio').then(data => {
      this.portfolio = data;
      this.portfolio.forEach(portfolioObject => {
        var coin = this.getCoin(portfolioObject.id);
        if (coin != null) {
          // Update object
          portfolioObject.price_usd_now = coin.price_usd;
          var increase = (portfolioObject.price_usd_now / portfolioObject.price_usd_when_added) * 100;
          portfolioObject.price_increase_percentage = increase.toFixed(2);
        }
      });
    });
  }

  // Custom method because why not
  getReadableTime(timestamp: number): string {
    if (timestamp == null) {
      return 'N/A';
    }
    var date: Date = new Date();
    date.setTime(timestamp);
    return date.toLocaleDateString();
  }

  getCoin(id: string): Coin {
    var ret: Coin;
    if (this.coins != null) {
      this.coins.forEach(coin => {
        if (coin.id == id) {
          ret = coin;
        }
      });
    }
    return ret;
  }
}
