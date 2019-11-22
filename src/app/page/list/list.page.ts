import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAction, AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  user : any;
  items : any = [];
  pensyarah : any;

  rule;

  constructor (
    public navCtrl: NavController,
    public auth : AuthenticationService,
    public afd : AngularFireDatabase
  ){
    this.user = this.auth.userProfile;
    this.getDataFromFireBase();
    
    this.rule = this.auth.rule;
    console.log(this.rule);
    
  }
    
  ngOnInit() {
    this.getDataFromFireBase();
  }


  getDataFromFireBase(){
    let dbFire = this.afd.list('saman');
    dbFire.valueChanges().subscribe(data=>{
      console.log(data);

      if(this.rule == 'lect'){
        var result:any = data.filter((obj:any)  =>{
          return obj.lect === this.user.email
        })
        console.log(result);
        this.items= result;
      }else if(this.rule == 'student'){
        var result:any = data.filter((obj:any)  =>{
          return obj.studentID === this.user.id
        })
        console.log(result);
        this.items= result;
      }else if(this.rule == 'admin'){
        this.items= data;
      }

    });


    // this.afd.list('pensyarah/').valueChanges().subscribe(
    //   data => {
    //     console.log(data)
    //     this.items= data
    //   }
    // )
  }

}
