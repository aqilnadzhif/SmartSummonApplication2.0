import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  id: any;
  user : any = "pelajar";
  rule: any;
  id_stdnt: any = null;

  constructor(
    public auth : AuthenticationService,
    public router: Router,
    public alertCtrl : AlertController,
    public firebase: AngularFireDatabase
  ) {

   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = this.auth.userProfile;
    this.rule = this.auth.rule;

    console.log('my profile');
  }

  cari(){
    console.log(this.id_stdnt);

    if(this.id_stdnt == null || this.id_stdnt == ''){
      this.show_alert('Sila masukkan ID pelajar')
    }else if(this.id_stdnt.length < 10){
      this.show_alert('Sila lengkapkan ID pelajar')
    }else if(isNaN(this.id_stdnt)){
      this.show_alert('ID pelajar tidak sah')
    }else{
      this.cari_function(this.id_stdnt);
    }
    
  }

  cari_function(detail){
    console.log(detail);

    let dbFire = this.firebase.list('pelajar');
    dbFire.valueChanges().subscribe(data=>{
      console.log(data);
      
      var result:any = data.find((obj:any)  =>{
        return obj.id === Number(detail)
      })

      if(result != undefined){
        console.log(result);

        let navExtras : NavigationExtras = {
          state : {
            detail : result
          }
        }

        this.router.navigate(['/create'], navExtras)
      }else{
        this.show_alert('id pelajar tidak ditemui')
      }
      
    })


  }

  //-------------------------------------------------------------------------------------- other functions

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
