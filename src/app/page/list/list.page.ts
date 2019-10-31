import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAction, AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  items : any;
  pensyarah : any;

  constructor (
    public navCtrl: NavController,
    public afd : AngularFireDatabase) {
      this.getDataFromFireBase();
    }
    
  ngOnInit() {
  }


  getDataFromFireBase(){
    this.afd.list('pensyarah/').valueChanges().subscribe(
      data => {
        console.log(data)
        this.items= data
      }
    )
  }

}
