import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  

  constructor(
    public router: Router,
    public sidemenu : MenuController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.sidemenu.enable(false);
  }

  ionViewDidLeave(){
    console.log("Keluar page landing");
    
    //this.sidemenu.enable(true);
  }

  navExtras(data){
    let rule : NavigationExtras = {
      state : {
        rule : data
      }
    }

    return rule;
  }

  LoginPensyarah(){

    this.router.navigateByUrl('/login' , this.navExtras('lect'))
    
  }

  LoginAdmin(){

    this.router.navigateByUrl('/login' , this.navExtras('admin'))
    
  }

  LoginPelajar(){

    this.router.navigateByUrl('/login' , this.navExtras('student'))
    
  }

}
