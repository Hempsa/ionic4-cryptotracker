import { Component, SystemJsNgModuleLoader } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      id: 'coins',
      title: 'Coins',
      url: '/coins',
      icon: 'logo-bitcoin'
    },
    {
      id: 'favourites',
      title: 'Favourites',
      url: '/favourites',
      icon: 'star'
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      url: '/portfolio',
      icon: 'briefcase'
    },
    {
      id: 'about',
      title: 'About',
      url: '/about',
      icon: 'information-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribeWithPriority(999, () => {
        navigator['app'].exitApp();
      });
    });
  }
}
