import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacultiesPage } from './faculties';

@NgModule({
  declarations: [
    FacultiesPage,
  ],
  imports: [
    IonicPageModule.forChild(FacultiesPage),
  ],
})
export class FacultiesPageModule {}
