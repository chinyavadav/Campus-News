import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-post',
 	templateUrl: 'post.html',
 })
 export class PostPage {
 	post:any;
 	selectedItem:number;
 	public title:string;
 	defaultPhotoPath:string="assets/imgs/placeholder.jpg";
 	imgPath=this.defaultPhotoPath;
 	public formAddEdit: FormGroup;

 	constructor(public camera:Camera, public http:Http, public alertCtrl:AlertController ,public global:GlobalProvider ,public loadingCtrl:LoadingController , public toastCtrl: ToastController, public formBuilder:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
 		let tempPost=navParams.get('post');
 		if(!tempPost){
 			this.title="New Post";
 		}else{
 			this.post=tempPost;
 			this.title=tempPost.fldpost_title;
 			if(this.post.fldpicture!=""){
 				this.imgPath=this.post.fldpicture;
 			}
 			//this.selectedItem=this.postTypes.indexOf(tempPost.fldtype);
 		}
 		this.formAddEdit=this.formBuilder.group({
 			title: ['',Validators.required],
 			post: ['',Validators.required],
 		});
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad PostPage');
 	}

 	returnHome(){
 		this.navCtrl.setRoot(HomePage);
 	}

 	addEdit() {
 		if(this.formAddEdit.valid){
 			let loader = this.loadingCtrl.create({
 				content: "Processing...",
 				spinner:"bubbles"
 			});

 			loader.present();
 			let postData:any;
 			postData=this.formAddEdit.value;
 			postData["picture"]=this.imgPath;
 			postData["faculty_id"]=this.global.session.fldfaculty_id;
 			let mybaseURL:string;
 			if(this.post){
 				mybaseURL=this.global.serverAddress+"api/edit_post.php?post_id="+this.post.fldpost_id;
 			}else{
 				mybaseURL=this.global.serverAddress+"api/add_post.php";
 			}
 			this.http.post(mybaseURL, JSON.stringify(postData))
 			.subscribe(data => {
 				console.log(data["_body"]);
 				let response = JSON.parse(data["_body"]);
 				if(response.response=="success"){
 					loader.dismiss();
 					let alert = this.alertCtrl.create({
 						title: 'Post',
 						subTitle: 'Post was successfully posted!',
 						buttons: ['OK']
 					});
 					alert.present();
 					this.navCtrl.pop();
 				}else{
 					loader.dismiss();
 					let alert = this.alertCtrl.create({
 						title: 'Edit Post',
 						subTitle: 'Could not publish Post!',
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
 		}else{
 			let toast = this.toastCtrl.create({
 				message: 'Properly fill in all details!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		}
 	}

 	takePhoto(){
 		const options: CameraOptions = {
 			quality: 70,
 			destinationType: this.camera.DestinationType.DATA_URL,
 			//sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
 			encodingType: this.camera.EncodingType.JPEG,
 			mediaType: this.camera.MediaType.PICTURE,
 			saveToPhotoAlbum: false,
 			allowEdit: false,
 			targetWidth:  500,
 			targetHeight: 500
 		}

 		this.camera.getPicture(options).then((imageData) => {
 			this.imgPath = 'data:image/jpeg;base64,' + imageData;
 		}, (err) => {
 			this.imgPath=this.defaultPhotoPath;
 			let toast = this.toastCtrl.create({
 				message: 'Could not access camera!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		});
 	}

 	getPhoto(){
 		const options: CameraOptions = {
 			quality: 70,
 			destinationType: this.camera.DestinationType.DATA_URL,
 			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
 			saveToPhotoAlbum: false,
 			allowEdit: true,
 			targetWidth: 500,
 			targetHeight: 500
 		}

 		this.camera.getPicture(options).then((imageData) => {
 			this.imgPath = 'data:image/jpeg;base64,' + imageData;
 		}, (err) => {
 			this.imgPath=this.defaultPhotoPath;
 			let toast = this.toastCtrl.create({
 				message: 'Could not open Gallery!',
 				duration: 3000,
 				position: 'bottom',
 				cssClass: 'dark-trans',
 				closeButtonText: 'OK',
 				showCloseButton: true
 			});
 			toast.present();
 		});
 	}
 }
