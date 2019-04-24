import { Component } from '@angular/core';
import { PortfolioObject } from '../portfolio-object';
import { PopoverController, NavParams, ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-portfolio-popover',
  templateUrl: './portfolio-popover.component.html',
  styleUrls: ['./portfolio-popover.component.scss', '../common.scss'],
})
export class PortfolioPopoverComponent {
  added: any = null;
  object: PortfolioObject;
  portfolio: PortfolioObject[] = [];

  constructor(private navParams: NavParams,
    private popoverController: PopoverController,
    private storageService: StorageService,
    private toastController: ToastController) {
    this.object = navParams.get('object');
    // Load portfolio
    this.storageService.get('portfolio').then(data => {
      if (data != null) {
        this.portfolio = data;
      }
    });
  }

  addToPortfolio() {
    this.object.timestamp = this.getAddedTime();
    if (this.object.timestamp != null && this.object.amount != null && this.object.price_usd_when_added != null) {
      //console.log('Adding portfolio object with values: ');
      //console.log('Date: ' + this.object.timestamp);
      //console.log('Amount: ' + this.object.amount);
      //console.log('Price: ' + this.object.price_usd_when_added);
      this.portfolio.push(this.object);
      this.storageService.put('portfolio', this.portfolio);
      this.popoverController.dismiss();
      this.displayToast('Added ' + this.object.name + ' to portfolio.', 2000);
    } else {
      this.displayToast('One or more values are invalid.', 2000);
    }
  }

  getAddedTime(): number {
    if (this.added != null) {
      return Date.parse(this.added);
    }
    return null;
  }

  async displayToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
