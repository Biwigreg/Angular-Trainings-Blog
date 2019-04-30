import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PostComponent } from './post-collection/post/post.component';
import { PostCollectionComponent } from './post-collection/post-collection.component';
import { AddPostComponent } from './add-post/add-post.component';
import {PostService} from './services/post.service';
import { RouterModule, Route } from '@angular/router';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBjwUgRxK35kerFHQKmMtEWFhk0SveGxdY",
  authDomain: "angulartraining-757a9.firebaseapp.com",
  databaseURL: "https://angulartraining-757a9.firebaseio.com",
  projectId: "angulartraining-757a9",
  storageBucket: "gs://angulartraining-757a9.appspot.com",
  messagingSenderId: "angularTest",
};


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostCollectionComponent,
    AddPostComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([     
      { path: 'posts', component: PostCollectionComponent },
      { path: 'add', component: AddPostComponent },
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      { path: '**', redirectTo: 'posts' }])
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor()
{
  firebase.initializeApp(firebaseConfig);
}
 }
