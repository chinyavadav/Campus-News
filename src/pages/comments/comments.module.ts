import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentsPage } from './comments';
import { CommentServiceProvider } from "../../providers/comment-service/comment-service";

@NgModule({
  declarations: [
    CommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentsPage),
  ],
    exports: [
    CommentsPage
  ],
  providers: [
    CommentServiceProvider,
  ]
})
export class CommentsPageModule {}