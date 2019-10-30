import { Component, ElementRef, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
//import { ProfilePage } from '../profile/profile';
import { CommentServiceProvider, Comment } from "../../providers/comment-service/comment-service";
/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-comments',
 	templateUrl: 'comments.html',
 })
 export class CommentsPage {
 	post:any;
 	@ViewChild(Content) content: Content;
 	@ViewChild('chat_input') commentInput: ElementRef;
 	editorCmnt = '';
 	showEmojiPicker = false;
 	chat:any;

 	constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public http:Http, public global:GlobalProvider, public navCtrl: NavController, public navParams: NavParams,private commentService: CommentServiceProvider ,private events: Events) {
 		this.post=navParams.get('post');
 		if(!this.post){
 			this.navCtrl.pop();
 		}
 		this.commentService.post_id=this.post.fldpost_id;
 	}

    delete(commentId) {
       let alert = this.alertCtrl.create({
          title: 'Delete Comment',
          message: 'Do you want to delete comment?',
          buttons: [
          {
             text: 'Cancel',
             role: 'cancel',
             handler: () => {
                console.log('Cancel clicked');
             }
          },
          {
             text: 'Delete',
             handler: () => {
                this.processDelete(commentId);
             }
          }
          ]
       });
       alert.present();
    }

    processDelete(commentId){
       this.http.get(this.global.serverAddress+"api/delete_comment.php?commentId="+commentId)
       .subscribe(data => {
          console.log(data["_body"]);
          let response = JSON.parse(data["_body"]);
          if(response.response=="success"){
             let alert = this.alertCtrl.create({
                title: 'Comment',
                subTitle: 'Comment successfully deleted!',
                buttons: ['OK']
             });
             alert.present();
             this.getMessages();
          }else{
             let alert = this.alertCtrl.create({
                title: 'Comment',
                subTitle: 'Could not be deleted!',
                buttons: ['OK']
             });
             alert.present();
          }
       }, error => {
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

    ionViewDidLoad() {
       console.log('ionViewDidLoad CommentsPage');
    }

 	  /*viewProfile(userid:string){
    this.navCtrl.push(ProfilePage,{"userid":userid});
 }*/

 ionViewWillLeave() {
    this.events.unsubscribe('chat:received');
 }

 ionViewDidEnter() {
    this.events.subscribe('chat:received', cmnt => {
       this.pushNewCmnt(cmnt);
    });
    this.getMessages();
 }

 getMessages(){
    this.commentService.getCmnt();
    this.chat=this.commentService.cmntList;
    console.log(this.chat);
    this.onFocus();
 }

 onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
 }

 switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
       this.focus();
    } else {
       this.setTextareaScroll();}

       this.content.resize();
       this.scrollToBottom();
    }

  /**
   * @name sendCmnt
   */
   sendCmnt(cmnttype) {
   	if (!this.editorCmnt.trim()) return;
   	let newCmnt: Comment = {
   		commentId: Date.now().toString(),
   		fromUserId: this.global.session.flduser_id,
   		fromUserName: this.global.session.fldforename+' '+this.global.session.fldsurname,
   		time: Date.now(),
   		comment: this.editorCmnt,
   		visible: 'true'
   	};

   	this.pushNewCmnt(newCmnt);
   	this.editorCmnt = '';

   	if (!this.showEmojiPicker) {
   		this.focus();
   	}
   	this.commentService.sendComment(newCmnt);
   }

  /**
   * @name pushNewCmnt
   * @param cmnt
   */
   pushNewCmnt(cmnt: Comment) {
   	this.chat.push(cmnt);
   	this.scrollToBottom();
   }

   getCmntIndexById(id: string) {
   	return this.commentService.cmntList.findIndex(e => e.commentId === id)
   }

   scrollToBottom() {
   	setTimeout(() => {
   		if (this.content.scrollToBottom) {
   			try{
   				this.content.scrollToBottom();
   			}catch{

   			}        
   		}
   	}, 400)
   }

   private focus() {
   	if (this.commentInput && this.commentInput.nativeElement) {
   		this.commentInput.nativeElement.focus();
   	}
   }

   private setTextareaScroll() {
   	const textarea =this.commentInput.nativeElement;
   	textarea.scrollTop = textarea.scrollHeight;
   }

}
