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

  user;
  myDate: String = new Date().toISOString();

  detailStudent;


  constructor(
    public auth : AuthenticationService,
    public router: Router,
    public alertCtrl : AlertController
  ) { 
    let data = this.router.getCurrentNavigation().extras.state.detail;
    this.user = data;
    console.log(this.user);

    this.detailStudent = this.user;

    console.log(this.myDate);
    
    
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = this.auth.userProfile;

    console.log('my profile');
  }
}
 