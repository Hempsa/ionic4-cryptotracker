import { Component } from '@angular/core';
import { Coin } from '../coin';
import { StorageService } from '../storage.service';
import { PortfolioObject } from '../portfolio-object';
import { PopoverController, NavParams } from '@ionic/angular';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-coins-popover',
  templateUrl: './coins-popover.component.html',
  styleUrls: ['./coins-popover.component.scss'],
})
export class CoinsPopoverComponent {

  coin: Coin;
  favourites: string[] = [] /* declare favourites as array, only cached for convenience */
  portfolio: PortfolioObject[] = [];

  constructor(private navParams: NavParams, private popoverController: PopoverController, private storageService: StorageService) {
    this.coin = navParams.get('data');
    // Load favorites
    this.storageService.get('favourites').then(data => {
      if (data != null) {
        this.favourites = data;
      }
    });
    // Load portfolio
    this.storageService.get('portfolio').then(data => {
      if (data != null) {
        this.portfolio = data;
      }
    });
  }

  /**
   * Returns true if favourites contains current coin
   */
  favouritesContains(): boolean {
    var contains: boolean = false;
    if (this.favourites == null) {
      return false;
    }
    return this.favourites.indexOf(this.coin.id) > -1;
  }

  /**
   * Add to favourites
   */
  addToFavourites() {
    this.favourites.push(this.coin.id);
    this.storageService.put('favourites', this.favourites);
    this.dismiss();
  }

  /**
   * Remove from favourites
   */
  removeFromFavourites() {
    var tmpArr: string[] = [];
    this.favourites.forEach(id => {
      if (id != this.coin.id) {
        tmpArr.push(id);
      }
    });
    this.storageService.put('favourites', tmpArr);
    this.dismiss();
  }

  /**
   * Returns true if portfolio contains current coin
   */
  portfolioContains(): boolean {
    var contains: boolean = false;
    if (this.portfolio == null) {
      return false;
    }
    this.portfolio.forEach(coin => {
      if (this.coin.id == coin.id) {
        contains = true;
      }
    });
    return contains;
  }

  /**
   * Add to portfolio
   */
  addToPortfolio() {
    var portfolioObj: PortfolioObject = new PortfolioObject();
    portfolioObj.id = this.coin.id;
    portfolioObj.name = this.coin.name;
    portfolioObj.symbol = this.coin.symbol;
    portfolioObj.timestamp = Date.now();
    portfolioObj.price_usd_when_added = this.coin.price_usd;
    this.portfolio.push(portfolioObj);
    this.storageService.put('portfolio', this.portfolio);
    this.dismiss();
  }

  /**
   * Remove from portfolio
   */
  removeFromPortfolio() {
    var tmpArr: PortfolioObject[] = [];
    this.portfolio.forEach(portfolioObj => {
      if (this.coin.id != portfolioObj.id) {
        tmpArr.push(portfolioObj);
      }
    });
    this.storageService.put('portfolio', tmpArr);
    this.dismiss();
  }

  dismiss() {
    this.popoverController.dismiss();
  }

}
