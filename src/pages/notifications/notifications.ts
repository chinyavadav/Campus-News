import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-notifications',
 	templateUrl: 'notifications.html',
 })
 export class NotificationsPage {

 	baseURL:string;
 	post_id:number;
 	total:number;
 	notifications=[];

 	constructor(public alertCtrl:AlertController, public toastCtrl: ToastController, public global:GlobalProvider, public http:Http,public navCtrl: NavController, public navParams: NavParams) {

 	}

 	initPosts() {
 		console.log(this.global.session);
 		this.baseURL=this.global.serverAddress+"api/today-posts.php"
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			this.notifications=JSON.parse(data["_body"]);
 			for (var key in this.notifications) {
 				console.log(key);
 				this.global.createNotification(this.notifications[key]);
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	ionViewDidEnter() {
 		this.initPosts();
 	}

 }
