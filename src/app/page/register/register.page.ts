import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  Email: any;
  position: any;
  jawatan: any;
  phone: any;
  name: any;
  katalaluan: any;

  rule: any;

  constructor(
    public fireDB : AngularFireDatabase,
    public auth : AuthenticationService,
    public router : Router,
    public alertCtrl : AlertController
  ) { 
    this.rule = this.router.getCurrentNavigation().extras.state.rule;
  }

  ngOnInit() {
  }

  register(){
    let detail = {
      email : this.Email,
      position : this.position,
      jawatan : this.jawatan,
      phone : this.phone,
      name : this.name,
      katalaluan : this.katalaluan
    }
    
    if(this.rule == 'lect'){
      let dbFire = this.fireDB.list('pensyarah');
      dbFire.push(detail).then(res=>{
        this.show_alert();
        console.log(res);
        this.Email = null;
        this.position = null;
        this.jawatan = null;
        this.phone = null;
        this.name = null;
        this.katalaluan = null;
      })
    }else if(this.rule == 'admin'){
      let dbFire = this.fireDB.list('admin');
      dbFire.push(detail).then(res=>{
        this.show_alert();
        console.log(res);
        this.Email = null;
        this.position = null;
        this.jawatan = null;
        this.phone = null;
        this.name = null;
        this.katalaluan = null;
      })
    }else if(this.rule == 'student'){
      let dbFire = this.fireDB.list('pelajar');
      dbFire.push(detail).then(res=>{
        this.show_alert();
        console.log(res);
        this.Email = null;
        this.position = null;
        this.jawatan = null;
        this.phone = null;
        this.name = null;
        this.katalaluan = null;
      })
    }
  }

  async show_alert(){
    let alert = await this.alertCtrl.create({
      message : 'Berjaya Simpan'
    })

    await alert.present();

    setTimeout(() => {
      alert.dismiss();
    }, 1500);
  }

}
