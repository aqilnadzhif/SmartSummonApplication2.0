import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAction, AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { map } from 'rxjs/operators';


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
  }


  getDataFromFireBase(){
    let dbFire = this.afd.list('saman');

    dbFire.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data=>{
      console.log(data);

      if(this.rule == 'lect'){
        var result:any = data.filter((obj:any)  =>{
          return obj.lect === this.user.email
        })
        console.log(result);
        this.items= result.reverse();
      }else if(this.rule == 'student'){
        var result:any = data.filter((obj:any)  =>{
          return obj.studentID === this.user.id
        })
        console.log(result);
        this.items= result.reverse();
      }else if(this.rule == 'admin'){
        this.items= data.reverse();
      }
      
    });
    
    // dbFire.valueChanges().subscribe(data=>{
    //   console.log(data);

    //   if(this.rule == 'lect'){
    //     var result:any = data.filter((obj:any)  =>{
    //       return obj.lect === this.user.email
    //     })
    //     console.log(result);
    //     this.items= result.reverse();
    //   }else if(this.rule == 'student'){
    //     var result:any = data.filter((obj:any)  =>{
    //       return obj.studentID === this.user.id
    //     })
    //     console.log(result);
    //     this.items= result;
    //   }else if(this.rule == 'admin'){
    //     this.items= data;
    //   }

    // });


    // this.afd.list('pensyarah/').valueChanges().subscribe(
    //   data => {
    //     console.log(data)
    //     this.items= data
    //   }
    // )
  }

  request(item){
    console.log(item);

    let dbFire = this.afd.list('saman');

    if(this.rule == 'student'){
      dbFire.update(item.key, {status : 1})
    }else if(this.rule == 'admin'){
      dbFire.update(item.key, {status : 2, harga : 30})
    }
    
  }

  bayaran(item){
    let dbFire = this.afd.list('saman');
    dbFire.update(item.key, {statusBayaran : 1})
  }

  tolakPemohonan(item){
    let dbFire = this.afd.list('saman');
    dbFire.update(item.key, {status : 3})
  }

}
