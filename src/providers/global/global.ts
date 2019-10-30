import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class GlobalProvider {

  	session:any;
  	serverAddress:string;
  	accessLevel=null;
    notifications={};
    getParams="";

    constructor(private localNotifications: LocalNotifications) {
      console.log('Hello GlobalProvider Provider');
    }

    createNotification(notification){
      if(!(notification.fldpost_id in this.notifications)){
        this.notifications[notification.fldpost_id]=notification;
        this.showNotification(notification);
      }
    }

    showNotification(post){
      this.localNotifications.schedule({
        id: post.fldpost_id,
        title: post.fldpost_title,
        text: post.fldpost,
        sound: 'file://sound.mp3',
      });
    }

  }







