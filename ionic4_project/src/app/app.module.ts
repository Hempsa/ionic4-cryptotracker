import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { CoinmanagementPopoverComponent } from './coinmanagement-popover/coinmanagement-popover.component';
import { PortfolioPopoverComponent } from './portfolio-popover/portfolio-popover.component';
import { FormsModule } from '@angular/forms';
import { MarketsharePopoverComponent } from './marketshare-popover/marketshare-popover.component';

@NgModule({
  declarations: [AppComponent, CoinmanagementPopoverComponent, PortfolioPopoverComponent, MarketsharePopoverComponent],
  entryComponents: [CoinmanagementPopoverComponent, PortfolioPopoverComponent, MarketsharePopoverComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
