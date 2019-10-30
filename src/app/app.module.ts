import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ApplicantsPage } from '../pages/applicants/applicants';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { FacultyadminLoginPage } from '../pages/facultyadmin-login/facultyadmin-login';
import { FacultiesPage } from '../pages/faculties/faculties';
import { ChatPage } from '../pages/chat/chat';
import { ChatsPage } from '../pages/chats/chats';
import { SettingsPage } from '../pages/settings/settings';
import { NotificationsPage } from '../pages/notifications/notifications';
import { CommentsPage } from '../pages/comments/comments';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule} from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from '../providers/global/global';
import { Camera } from '@ionic-native/camera';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import { CommentServiceProvider } from '../providers/comment-service/comment-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { PostsPage } from '../pages/posts/posts';
import { PostPage } from '../pages/post/post';

@NgModule({
  declarations: [
    MyApp,
    ApplicantsPage,
    HomePage,
    LoginPage,
    FacultyadminLoginPage,
    FacultiesPage,
    ChatPage,
    ChatsPage,
    SettingsPage,
    NotificationsPage,
    PostsPage,
    PostPage,
    CommentsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ApplicantsPage,
    HomePage,
    LoginPage,
    FacultyadminLoginPage,
    FacultiesPage,
    ChatPage,
    ChatsPage,
    SettingsPage,
    NotificationsPage,
    PostsPage,
    PostPage,
    CommentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    Camera,
    ChatServiceProvider,
    CommentServiceProvider,
    LocalNotifications
  ]
})
export class AppModule {}
