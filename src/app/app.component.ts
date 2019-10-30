import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from "../providers/global/global";
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { FacultiesPage } from '../pages/faculties/faculties';
import { ChatsPage } from '../pages/chats/chats';
import { SettingsPage } from '../pages/settings/settings';
import { NotificationsPage } from '../pages/notifications/notifications';
import { PostsPage } from '../pages/posts/posts';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  constructor(public storage: Storage, public global: GlobalProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp(){   
    this.platform.ready().then(() => {          
      this.storage.ready().then(()=> {
        this.storage.get('serverAddress').then((val) =>{
          this.setServerAddress(val);
        });
        this.storage.get('session').then((val) =>{
          this.setAccount(val);
        });
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setAccount(val){
    this.global.session=val;
    if(this.global.session==null){
      this.rootPage = LoginPage;
      this.global.session=null;
    }else{
      if(this.global.session.fldregno){
        this.global.accessLevel="Student";
      }else{
        this.global.accessLevel="FacultyAdmin";
      }
      this.rootPage = HomePage;
    }
  }

  setServerAddress(val){
    if(val!=null){
      this.global.serverAddress=val;
    }else{
      this.global.serverAddress="http://msu22.000webhostapp.com/msunews/";
    }
  }

  openPage(index){
    let myPages=[NotificationsPage, FacultiesPage, ChatsPage, PostsPage, SettingsPage];
    this.nav.push(myPages[index]);
  }

  logout(){
    this.storage.remove("session"); 
    this.global.session=null;
    this.global.accessLevel=null;
    this.nav.setRoot(LoginPage);
  }
}
