import { Component } from '@angular/core';
import { Coin } from '../coin';
import { StorageService } from '../storage.service';
import { PortfolioObject } from '../portfolio-object';
import { PopoverController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-coinmanagement-popover',
  templateUrl: './coinmanagement-popover.component.html',
  styleUrls: ['./coinmanagement-popover.component.scss'],
})
export class CoinmanagementPopoverComponent {

  source: string;

  // coin: Coin; // Coin object, set from coins and favourite page
  object: PortfolioObject; // PortfolioObject, set only from portfolio page

  favourites: string[] = [] /* declare favourites as array, only cached for convenience */
  portfolio: PortfolioObject[] = [];

  constructor(private navParams: NavParams, private popoverController: PopoverController, private storageService: StorageService) {
    this.source = navParams.get('source');
    this.object = navParams.get('object');
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
  * Inconvenient way to update values as the way this works is bad
  */
  /**
   updateValues() {
     if (this.coin != null) {
       this.id = this.coin.id;
       this.symbol = this.coin.symbol;
       this.title = this.coin.name;
     } else if (this.portfolioObject != null) {
       this.id = this.portfolioObject.id;
       this.symbol = this.portfolioObject.symbol;
       this.title = this.portfolioObject.name;
     }
   }
   */

  /**
   * Return whether favourite items should be included in popover menu
   */
  displayFavouritesItems(): boolean {
    return this.source == 'page.coins' || this.source == 'page.favourites';
  }

  /**
   * Returns true if favourites contains current coin
   */
  favouritesContains(): boolean {
    var contains: boolean = false;
    if (this.favourites == null) {
      return false;
    }
    return this.favourites.indexOf(this.object.id) > -1;
  }

  /**
   * Add to favourites
   */
  addToFavourites() {
    this.favourites.push(this.object.id);
    this.storageService.put('favourites', this.favourites);
    this.dismiss();
  }

  /**
   * Remove from favourites
   */
  removeFromFavourites() {
    var tmpArr: string[] = [];
    this.favourites.forEach(id => {
      if (this.object != null && this.object.id != id) {
        tmpArr.push(id);
      }
    });
    this.storageService.put('favourites', tmpArr);
    this.dismiss();
  }

  /**
   * Return whether favourite items should be included in popover menu
   */
  displayPortfolioItems(): boolean {
    return this.source == 'page.coins' || this.source == 'page.portfolio';
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
      if (this.object != null && this.object.id == coin.id) {
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
    portfolioObj.id = this.object.id;
    portfolioObj.name = this.object.name;
    portfolioObj.symbol = this.object.symbol;
    portfolioObj.timestamp = Date.now();
    portfolioObj.price_usd_when_added = this.object.price_usd;
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
      if (this.object != null && this.object.id != portfolioObj.id) {
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
