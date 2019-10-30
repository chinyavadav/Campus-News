import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the FacultiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-faculties',
 	templateUrl: 'faculties.html',
 })
 export class FacultiesPage {
 	faculties=[];
 	baseURL:string;
 	constructor(public alertCtrl: AlertController, public toastCtrl:ToastController, public http:Http, public global:GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad FacultiesPage');
 		this.initSkills();
 	}

 	view(fid){
 		this.global.getParams="?fid="+fid;
 		this.navCtrl.pop();
 	}

 	filterSkills(ev: any) {
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			this.faculties=JSON.parse(data["_body"]);
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.faculties = this.faculties.filter((faculty) => {
 					return ((faculty.fldfaculty_title.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	initSkills() {
 		console.log(this.global.session);
 		this.baseURL=this.global.serverAddress+"api/faculties.php";
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			this.faculties=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}
 }
