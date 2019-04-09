import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Coin } from '../coin';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss', "../common.scss"],
})
export class FavouritesPage {

  favourites: string[]; /* declare favourites as array */
  allCoins: Coin[];
  visibleCoins: Coin[] = [];

  constructor(private storageService: StorageService, private apiService: ApiService) {
    this.apiService.getCoins().subscribe(data => {
      this.allCoins = data;
    });
  }

  ionViewDidEnter() {
    this.storageService.get('favourites').then(data => {
      this.favourites = data;
      this.updateFavourites();
    });
  }

  updateFavourites() {
    this.visibleCoins = [];
    if (this.favourites == null) {
      return; // No favourites
    }
    this.allCoins.forEach(coin => {
      if (this.favourites.indexOf(coin.id) > -1) {
        this.visibleCoins.push(coin);
      }
    });
  }

}
