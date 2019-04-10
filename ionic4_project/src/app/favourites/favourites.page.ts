import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Coin } from '../coin';
import { ApiService } from '../api.service';
import { PopoverController } from '@ionic/angular';
import { CoinmanagementPopoverComponent } from '../coinmanagement-popover/coinmanagement-popover.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss', "../common.scss"],
})
export class FavouritesPage {

  favourites: string[]; /* declare favourites as array */
  allCoins: Coin[];
  visibleCoins: Coin[] = [];

  constructor(private popoverController: PopoverController, private storageService: StorageService, private apiService: ApiService) {
    this.apiService.getCoins().subscribe(data => {
      this.allCoins = data;
    });
  }

  async showPopover(coin: Coin) {
    const popoverElement = await this.popoverController.create({
      component: CoinmanagementPopoverComponent,
      componentProps: {
        source: 'page.favourites',
        coin: coin
      }
    });
    popoverElement.onWillDismiss().then(() => {
      this.ionViewDidEnter();
    });
    return await popoverElement.present();
  }

  ionViewDidEnter() {
    this.storageService.get('favourites').then(data => {
      this.favourites = data;
      this.updateFavourites();
    });
  }

  updateFavourites() {
    this.visibleCoins = [];
    if (this.favourites == null || this.allCoins == null) {
      return; // Missing data
    }
    this.allCoins.forEach(coin => {
      if (this.favourites.indexOf(coin.id) > -1) {
        this.visibleCoins.push(coin);
      }
    });
  }

}
