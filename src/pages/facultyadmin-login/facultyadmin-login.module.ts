import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacultyadminLoginPage } from './facultyadmin-login';

@NgModule({
  declarations: [
    FacultyadminLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(FacultyadminLoginPage),
  ],
})
export class FacultyadminLoginPageModule {}
