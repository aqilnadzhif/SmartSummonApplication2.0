import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss']
})
export class CreatePage implements OnInit {

  user : any = null;
  rule : any = null;
  myDate: String = new Date().toISOString();


  constructor(
    public auth : AuthenticationService,
    public router: Router,
    public alertCtrl : AlertController
  ) { 
  
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = this.auth.userProfile;
    this.rule = this.auth.rule;

    console.log('my profile');
  }
}
 