import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
  }

  get(key: string) {
    return this.storage.get(key);
  }

  put(key: string, value: any) {
    this.storage.set(key, value).then((response) => {
      this.get(key);
    }).catch((error) => {
      console.error('Error saving value with key: ' + key);
    });
  }

  clear(key: string) {
    this.storage.remove(key).then(() => {
      console.log('Removed value with key: ' + key);
    });
  }
}
