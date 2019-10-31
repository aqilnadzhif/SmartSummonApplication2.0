import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  rule : any;

  email_lect: any = null;
  pswd_lect : any = null;
  email_admin: any = null;
  pswd_admin : any = null;
  id_stdnt: any = null;
  pswd_stdnt : any = null;
  

  constructor(
    public auth: AuthenticationService,
    public router: Router,
    public alertCtrl: AlertController,
    public firebase: AngularFireDatabase
    // public sidemenu: MenuController
  ) { 
    this.rule = this.router.getCurrentNavigation().extras.state.rule;
    console.log(this.rule);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // this.sidemenu.enable(false);
  }
  

  ionViewDidLeave(){
    console.log("Keluar page landing");
    
    // this.sidemenu.enable(true);
  }

  login(){
    let getString: any;

    console.log('click');

    if(this.rule == "lect"){
      getString = {
        email : this.email_lect,
        pswd : this.pswd_lect
      }
    }else if(this.rule == "admin"){
      getString = {
        email : this.email_admin,
        pswd : this.pswd_admin
      }
    }else if(this.rule == "student"){
      getString = {
        email : this.id_stdnt,
        pswd : this.pswd_stdnt
      }
    }

    console.log(getString);

    if(getString.email == null || getString.email == ""){
      if(this.rule == "student"){
        this.show_alert('Sila Masukkan ID Pelajar')
      }else{
        this.show_alert('Sila Masukkan Email') 
      }
    }else if(getString.pswd == null || getString.pswd == ""){
      this.show_alert('Sila Masukkan Katalaluan')
    }else{


      this.loginMethod(getString)
      // this.auth.login(this.rule);
    }

    //this.auth.login();
    
  }

  loginMethod(detail){
    //console.log(detail.email);
    
    if(this.rule == 'student'){
      let dbFire = this.firebase.list('pelajar');
      dbFire.valueChanges().subscribe(data=>{
        console.log(data);
        
        var result:any = data.find((obj:any)  =>{
          return obj.id === Number(detail.email)
        })

        if(result != undefined){
          if(result.katalaluan == detail.pswd){
            let dataUser = {'rule' : this.rule, 'detail' : result};
            this.auth.login(dataUser);
          }else{
            this.show_alert('Katalaluan salah')
          }
        }else{
          this.show_alert('id pelajar tidak ditemui')
        }
        
      })
    }else if(this.rule == 'admin'){
      let dbFire = this.firebase.list('admin');
      dbFire.valueChanges().subscribe(data=>{
        console.log(data);
        
        var result:any = data.find((obj:any)  =>{
          return obj.email === detail.email
        })

        if(result != undefined){
          if(result.katalaluan == detail.pswd){
            let dataUser = {'rule' : this.rule, 'detail' : result};
            this.auth.login(dataUser);
          }else{
            this.show_alert('Katalaluan salah')
          }
        }else{
          this.show_alert('Email tidak ditemui')
        }
        
      })
    }else if(this.rule == 'lect'){
      let dbFire = this.firebase.list('pensyarah');
      dbFire.valueChanges().subscribe(data=>{
        console.log(data);
        
        var result:any = data.find((obj:any)  =>{
          return obj.email === detail.email
        })
        console.log(result);
        
        if(result != undefined){
          if(result.katalaluan == detail.pswd){
            let dataUser = {'rule' : this.rule, 'detail' : result};
            this.auth.login(dataUser);
          }else{
            this.show_alert('Katalaluan salah')
          }
        }else{
          this.show_alert('Email tidak ditemui')
        }
        
      })
    }
  }

  register(){

    let navExtras : NavigationExtras = {
      state : {
        rule : this.rule
      }
    }
    console.log('click');
    this.router.navigate(['/register'], navExtras)
    
  }


  //------------------------------------------------------------------------------ other method

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
