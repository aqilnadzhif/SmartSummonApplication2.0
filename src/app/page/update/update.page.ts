import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss']
})
export class UpdatePage implements OnInit {

public userProfile: firebase.firestore.DocumentReference;
public currentUser: firebase.User;

  katalaluan: string;
  rule: any;
  res: any;
 

  constructor(
   public fireDB : AngularFireDatabase,
  ) 
  {
    
    }
  

  ngOnInit() {
  }

  // updatePassword(newPassword: string, oldPassword: string): Promise<any> {
  //   const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
  //     this.katalaluan,
  //     oldPassword
  //   );
  
  //   return this.katalaluan.reauthenticateWithCredential(credential)
  //     .then(() => {
  //       this.katalaluan.updatePassword(newPassword).then(() => {
  //         console.log('Kemaskini Katalaluan');
  //       });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }


}
 