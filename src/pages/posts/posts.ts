import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, ToastController,NavParams, LoadingController} from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { PostPage } from '../post/post';
import { CommentsPage } from '../comments/comments';
import { CommentServiceProvider } from "../../providers/comment-service/comment-service";

/**
 * Generated class for the PostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-posts',
 	templateUrl: 'posts.html',
 })
 export class PostsPage {
 	posts=[];
 	baseURL:string;
 	constructor(public commentService:CommentServiceProvider, public http:Http, public alertCtrl:AlertController ,public global:GlobalProvider ,public loadingCtrl:LoadingController , public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad PostsPage');
 	}

 	ionViewDidEnter() {
 		this.initPosts();
 	}

 	filterPosts(ev: any) {
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			this.posts=JSON.parse(data["_body"]);
 			let val = ev.target.value;
 			if (val && val.trim() !== '') {
 				this.posts = this.posts.filter((post) => {
 					return ((post.fldtitle.toLowerCase().indexOf(val.toLowerCase()) > -1));
 				})
 			}
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	initPosts() {
 		console.log(this.global.session);
 		this.baseURL=this.global.serverAddress+"api/posts.php"
 		this.http.get(this.baseURL)
 		.subscribe(data => {
 			console.log(data);
 			this.posts=JSON.parse(data["_body"]);
 		}, error => {
 			console.log("failed");
 		}
 		);
 	}

 	add(){
 		this.navCtrl.push(PostPage);
 	}

 	edit(post){
 		this.navCtrl.push(PostPage, {'post':post});
 	}

 	delete(post){
 		let loader = this.loadingCtrl.create({
 			content: "Deleting...",
 			spinner:"bubbles"
 		});
 		loader.present();
 		this.http.get(this.global.serverAddress+"api/delete_post.php?post_id="+post.fldpost_id)
 		.subscribe(data => {
 			console.log(data["_body"]);
 			let response = JSON.parse(data["_body"]);
 			if(response.response=="success"){
 				loader.dismiss();
 				let alert = this.alertCtrl.create({
 					title: 'Post',
 					subTitle: 'Post was successfully deleted!',
 					buttons: ['OK']
 				});
 				alert.present();
 				this.initPosts();
 			}else{
 				loader.dismiss();
 				let alert = this.alertCtrl.create({
 					title: 'Post',
 					subTitle: 'Could not delete Post!',
 					buttons: ['OK']
 				});
 				alert.present();
 			}
 		}, error => {
 			loader.dismiss();
 			let toast = this.toastCtrl.create({
 				message: 'Resolve Connectivity Issue!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		}
 		);
 	}

 	comments(post){
 		this.navCtrl.push(CommentsPage,{'post':post});
 	}

 }
