import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  id: any;
  user : any = "pelajar";
  rule: any;
  id_stdnt: any = this.id;

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

  login(){

    let navExtras : NavigationExtras = {
      state : {
        rule : this.rule
      }
    }
    console.log('click');
    this.router.navigate(['/create'], navExtras)
    
  }
}
