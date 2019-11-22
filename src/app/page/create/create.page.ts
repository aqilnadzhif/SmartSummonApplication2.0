import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';



@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss']
})
export class CreatePage implements OnInit {

  user;
  userProfile;
  myDate: String = new Date().toISOString();
  masa;
  tarikh;

  detailStudent;
  harga = null;

  selectedBaju: any = [];
  selectedSeluar: any = [];
  selectedKasut: any = [];
  selectedRambut: any = [];


  constructor(
    public auth : AuthenticationService,
    public router: Router,
    public alertCtrl : AlertController,
    public fireDB : AngularFireDatabase,
  ) { 
    let data = this.router.getCurrentNavigation().extras.state.detail;
    this.user = data;

    this.userProfile = this.auth.userProfile;
    console.log(this.userProfile);

    this.detailStudent = this.user;

    console.log(this.myDate);

    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
    
    let refDateFormat = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    console.log(formatAMPM(refDateFormat));
    this.masa = formatAMPM(refDateFormat)


    let refDate = refDateFormat.getDate() + ' '+ months[refDateFormat.getMonth()].substring(0 , 3) +' '+ refDateFormat.getFullYear();
    this.tarikh = refDate;
    console.log(refDate);
    
    
    
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = this.auth.userProfile;

    console.log('my profile');
  }

  Selected(){

    let refBaju : any = this.selectedBaju;
    let refSeluar : any = this.selectedSeluar;
    let refKasut : any = this.selectedKasut;
    let refRambut : any = this.selectedRambut;
    
    if(this.selectedBaju.length == 0){
      refBaju = null;
    }
    if(this.selectedSeluar.length == 0){
      refSeluar = null;
    }
    if(this.selectedKasut.length == 0){
      refKasut = null;
    }
    if(this.selectedRambut.length == 0){
      refRambut = null;
    }

    let param = {
      baju : refBaju,
      seluar : refSeluar,
      kasut : refKasut,
      rambut : refRambut,
    }

    if(param.baju == null && param.seluar == null && param.kasut == null && param.rambut == null){
      this.harga = null
    }else{
      this.harga = 50;
    }

  }

  create_saman(){
    console.log(this.selectedBaju.length);
    let refBaju : any = this.selectedBaju;
    let refSeluar : any = this.selectedSeluar;
    let refKasut : any = this.selectedKasut;
    let refRambut : any = this.selectedRambut;
    
    if(this.selectedBaju.length == 0){
      refBaju = 'null';
    }
    if(this.selectedSeluar.length == 0){
      refSeluar = 'null';
    }
    if(this.selectedKasut.length == 0){
      refKasut = 'null';
    }
    if(this.selectedRambut.length == 0){
      refRambut = 'null';
    }


    let param = {
      studentID : this.detailStudent.id,
      studentDetail : this.detailStudent,
      lect: this.userProfile.email,
      lectDetail : this.userProfile,
      baju : refBaju,
      seluar : refSeluar,
      kasut : refKasut,
      rambut : refRambut,
      harga : this.harga,
      status : 0,
      masa : this.masa,
      tarikh : this.tarikh
    }

    if(param.baju == null && param.seluar == null && param.kasut == null && param.rambut == null){
      this.auth.show_alert('Sila pilih kesalahan pelajar')
    }else{
      let dbFire = this.fireDB.list('saman');
      dbFire.push(param).then(res=>{
        this.auth.show_alert('Saman disimpan.')
        window.history.back();
      });
    }

    console.log(param)
  }



}
 