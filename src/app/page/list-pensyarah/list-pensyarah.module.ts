import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListPensyarahPage } from './list-pensyarah.page';

const routes: Routes = [
  {
    path: '',
    component: ListPensyarahPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListPensyarahPage]
})
export class ListPensyarahPageModule {}
