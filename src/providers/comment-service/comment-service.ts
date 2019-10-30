import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { Http } from "@angular/http";
import { Observable } from "rxjs/observable";
import { GlobalProvider } from '../../providers/global/global';

export class Comment {
  commentId: string;
  fromUserId: string;
  fromUserName: string;
  time: number | string;
  comment: string;
  visible: string;
}

export class UserInfo {
  userid: string;
  fullname?: string;
  type?: string;
}

@Injectable()
export class CommentServiceProvider {
  post_id:number;
  cmntList: Comment[] = [];
  constructor(public global: GlobalProvider, private http: Http) {
  }

  getCmnt() {
    // Get mock comment list
    return this.getCommentList().subscribe(res => {
      console.log(res);
      this.cmntList=res;
    });
  }

  getCommentList(): Observable<Comment[]> {
    const cmntListUrl = this.global.serverAddress+'api/comments.php?post_id='+this.post_id; //cmnt-list.json
    return this.http.get(cmntListUrl).pipe(map(response =>JSON.parse(response["_body"]).array));
  }

  sendComment(comment: Comment) {
    console.log(comment);
    this.http.get(this.global.serverAddress+'api/comment.php?post_id='+this.post_id+'&from='+comment.fromUserId+"&comment="+comment.comment)
    .subscribe(data => {
      console.log(data['_body']);
      let response=JSON.parse(data["_body"]);
      if(response.response=="success"){
        this.getCmnt();
      }
    }, error => {
      console.log("failed to send");
    }
    );
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      userid: this.global.session.flduser_id,
      type: this.global.accessLevel,
      fullname: this.global.session.fldforename+' '+this.global.session.fldsurname,
    };
    return new Promise(resolve => resolve(userInfo));
  }

}