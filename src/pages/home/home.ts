import { Component } from '@angular/core';
import { NavController,AlertController, ToastController,NavParams, LoadingController} from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { CommentsPage } from '../comments/comments';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	posts=[];
	baseURL:string;
	constructor(public http:Http, public alertCtrl:AlertController ,public global:GlobalProvider ,public loadingCtrl:LoadingController , public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidEnter() {
		console.log('ionViewDidLoad HomePage');
		if(this.global.accessLevel=='Student'){
			this.initPosts();
		}
	}

	filterPosts(ev: any) {
		this.global.getParams="";
		this.http.get(this.baseURL)
		.subscribe(data => {
			console.log(data["_body"]);
			this.posts=JSON.parse(data["_body"]);
			let val = ev.target.value;
			if (val && val.trim() !== '') {
				this.posts = this.posts.filter((post) => {
					return ((post.fldpost_title.toLowerCase().indexOf(val.toLowerCase()) > -1));
				})
			}
		}, error => {
			console.log("failed");
		}
		);
	}

	initPosts() {
		console.log(this.global.session);
		this.baseURL=this.global.serverAddress+"api/posts.php"+this.global.getParams;
		this.http.get(this.baseURL)
		.subscribe(data => {
			console.log(data);
			this.posts=JSON.parse(data["_body"]);
		}, error => {
			console.log("failed");
		}
		);
	}

	returnHome(){
		this.navCtrl.setRoot(HomePage);
	}

	comments(post){
		this.navCtrl.push(CommentsPage,{'post':post});
	}
}
