import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// API:
import { ApiProvider } from '../../providers/api/api' // Import our provider. Also included in home.module.ts file
import { Chart } from 'chart.js'; // Import charts.js 
//import { DecimalPipe } from '@angular/common'; // Import DecimalPipe to round numbers 
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  @ViewChild('doughnutCanvas') doughnutCanvas;
  
  global = []; /* declare globals as array.. jostain syystä vinkuu virhettä total_market_cap_usd puuttumisesta, mutta kun tätä käyttää global: any;, ajaa ohjelman ja vaihtaa takaisin global = [] homma toimii  */
  coins = []; /* declare coins as array */

  
  doughnutChart: any; /* declare doughnutChart */


  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider) {
    this.apiProvider.getCoins().subscribe(data => { 
      this.coins = data 
      this.apiProvider.getGlobal().subscribe(data => { 
         this.global = data 
         this.drawChart();
       });// Loading the Data
    });
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  
  drawChart() {
    
    let values = [];  //doughnutChart values
    let labels = [];  //doughnutChart labels
    
    for (let i = 0; i < this.coins.length; i++) {
      if (this.coins[i].rank < 7 ) {
        labels.push(this.coins[i].name);
        var mshare = this.coins[i].market_cap_usd / this.global.total_market_cap_usd * 100;
        //var mshare = Math.round(this.coins[i].market_cap_usd / this.global.total_market_cap_usd)*100;
        values.push(mshare);
      }
    }

    console.log("values " + values);
   
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: values,
                borderColor: [
                    'rgb(209, 0, 44)',
                    'rgb(0, 80, 209)',
                    'rgb(0, 209, 59)',
                    'rgb(0, 209, 174)',
                    'rgb(125, 0, 209)',
                    'rgb(209, 0, 174)'
                ],
                backgroundColor: [
                    'rgb(209, 0, 44)',
                    'rgb(0, 80, 209)',
                    'rgb(0, 209, 59)',
                    'rgb(0, 209, 174)',
                    'rgb(125, 0, 209)',
                    'rgb(209, 0, 174)'
                ],
                hoverBackgroundColor: [
                    'rgba(209, 0, 44, 0.2)',
                    'rgba(0, 80, 209, 0.2)',
                    'rgba(0, 209, 59, 0.2)',
                    'rgba(0, 209, 174, 0.2)',
                    'rgba(125, 0, 209, 0.2)',
                    'rgba(209, 0, 174, 0.2)'
                ]
            }]
        },
        options: {
          legend: {
            labels: {
              fontColor: 'white'
            }
          }
        }
        
    });
  }
}
