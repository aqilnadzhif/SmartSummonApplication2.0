import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  user : any = null;
  rule : any = null;

  constructor(
    private sidemenu : MenuController,
    public auth : AuthenticationService
  ) { 
    //this.sidemenu.enable(true); 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.sidemenu.enable(true);
    this.user = this.auth.userProfile;
    this.rule = this.auth.rule;

    console.log('home page');
  }

}
