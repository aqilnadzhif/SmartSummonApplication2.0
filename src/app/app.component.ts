import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages : any = null;

  rule : any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth : AuthenticationService,
    public router : Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')){
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
    });

    this.auth.authenticationState.subscribe(res=>{
      if(res == true){
        this.router.navigateByUrl('/home');
        this.auth.checkRule().then(rule=>{
          console.log(rule);
          this.sideMenu(rule);
        })
        
      }else if(res == false){
        this.router.navigateByUrl('/landing');
        this.sideMenu(null);
      }
    })
  }

  sideMenu(data){
    console.log(data)
    if(data == 'lect'){
      this.appPages = [
      {
        title: 'Laman Utama',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Profil',
        url: '/myprofile',
        icon: 'person'
      },
      {
        title: 'Saman',
        url: '/search',
        icon: 'search'
      },
      {
        title: 'Senarai Saman',
        url: '/list',
        icon: 'list'
      }]
    }else if(data == 'admin'){
      this.appPages = [
      {
        title: 'Laman Utama',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Profil',
        url: '/myprofile',
        icon: 'person'
      },
      {
        title: 'Senarai Pensyarah',
        url: '/list',
        icon: 'list'
      },
      {
        title: 'Senarai Saman',
        url: '/list',
        icon: 'list'
      }]
    }else if(data == 'student'){
      this.appPages = [
      {
        title: 'Laman Utama',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Profil',
        url: '/myprofile',
        icon: 'person'
      },
      {
        title: 'Saman',
        url: '/list',
        icon: 'list'
      }]
    }else{
      this.appPages = null;
    }

    console.log(this.appPages);
    

  }

  logout(){
    console.log('click');

    this.auth.logout();
    
  }
}
