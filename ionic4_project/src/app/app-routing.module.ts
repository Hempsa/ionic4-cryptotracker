import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'coins',
    pathMatch: 'full'
  },
  {
    path: 'coins',
    loadChildren: './coins/coins.module#CoinsPageModule'
  },
  { 
    path: 'favourites',
    loadChildren: './favourites/favourites.module#FavouritesPageModule'
  },
  {
    path: 'portfolio',
    loadChildren: './portfolio/portfolio.module#PortfolioPageModule'
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
