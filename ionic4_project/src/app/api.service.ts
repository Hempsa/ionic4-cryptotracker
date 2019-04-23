import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http) { }

  /* Coinmarketcap */
  getCoins() {
    return this.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=100')
      .pipe(
        map(data => {
          return this.extractData(data);
        }),
        catchError(err => {
          return this.catchError(err);
        }),
        tap(response => {
          this.logResponse(response);
        })
      );
  }

  /* Coinpaprika */
  getCoinsNew() {
    return this.http.get('https://api.coinpaprika.com/v1/tickers')
      .pipe(
        map(data => {
          return this.extractData(data);
        }),
        catchError(err => {
          return this.catchError(err);
        }),
        tap(response => {
          this.logResponse(response);
        })
      );
  }

  /* Coinmarketcap */
  getGlobal() {
    return this.http.get('https://api.coinmarketcap.com/v1/global/')
      .pipe(
        map(data => {
          return this.extractData(data);
        }),
        catchError(err => {
          return this.catchError(err);
        }),
        tap(response => {
          return this.logResponse(response);
        })
      );
  }

  /* Coinpaprika */
  getGlobalNew() {
    return this.http.get('https://api.coinpaprika.com/v1/global')
      .pipe(
        map(data => {
          return this.extractData(data);
        }),
        catchError(err => {
          return this.catchError(err);
        }),
        tap(response => {
          return this.logResponse(response);
        })
      );
  }

  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || "Server error!");
  }
  private logResponse(res: Response) {
    console.log(res);
  }
  private extractData(res: Response) {
    return res.json();
  }
}
