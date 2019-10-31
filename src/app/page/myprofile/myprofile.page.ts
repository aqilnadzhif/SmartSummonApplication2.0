import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})

export class MyprofilePage implements OnInit {

  user : any = null;
  rule : any = null;

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

  register(){

    let navExtras : NavigationExtras = {
      state : {
        rule : this.rule
      }
    }
    console.log('click');
    this.router.navigate(['/update'], navExtras)
    
  }

  async show_alert(data){
    let alert = await this.alertCtrl.create({
      // header : 'Ralat!!!',
      message : data
    })

    await alert.present();

    setTimeout(() => {
      alert.dismiss();
    }, 2000);

  }
  

}
