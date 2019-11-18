import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';


 
const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  rule : any = null; 
  userProfile : any = null;
  pensyarah : any = null;
 
  authenticationState = new BehaviorSubject(null);
 
  constructor(private storage: Storage, private plt: Platform) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      console.log(res)
      if (res) {
        this.userProfile = res;
        this.authenticationState.next(true);
        this.checkRule();
      }else{
        this.userProfile = null;
        this.authenticationState.next(false);
      }
    })
  }

  checkRule(){
    return new Promise((resolve, reject) => {
      if(this.rule != null){
        console.log('rule ada');
        resolve(this.rule)
      }else{
        this.storage.get('rule').then(res => {
          console.log(res)
          this.rule = res;
          resolve(res);
        })
      }
    })
  }
 
  login(data) {
    console.log(data);
    
    this.storage.set('rule', data.rule);
    this.rule = data.rule;
    this.userProfile = data.detail;

    return this.storage.set(TOKEN_KEY, data.detail).then(() => {
      this.authenticationState.next(true);
    });

  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      this.storage.remove('rule');
      this.rule = null;
      this.userProfile = null;
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}