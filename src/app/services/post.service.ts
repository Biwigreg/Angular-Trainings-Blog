import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Post } from '../models/post';
import { Subject } from 'rxjs';
import Datasnapshot = firebase.database.DataSnapshot;

class SerializedPost
  {
    Id : number;
    Title : string;
    Content : string;
    CreatedAt : string;
    Score : number;

    constructor(id:number, title:string, content:string, createdAt:string, score:number){
      this.Id = id;
      this.Title = title;
      this.Content = content;
      this.CreatedAt = createdAt;
      this.Score = score;
    }
  }

@Injectable({
  providedIn: 'root'
})
export class PostService   {
  private posts : SerializedPost[] = [];
  postsSubject : Subject<Post[]> = new Subject<Post[]>();

  constructor() {
    this.loadPosts();
   }

  private loadPosts() { 
    firebase.database().ref("/posts").on('value', (data: Datasnapshot) => {
      this.posts = data.val() ? data.val() : [];
      this.onPostsUpdated();
    });
  }

  
  getPosts() 
  {
    return this.posts.map((x)=> new Post(x.Id, x.Title, x.Content, x.Score, new Date(x.CreatedAt)));
  }

  private onPostsUpdated()
  {
      this.postsSubject.next(this.getPosts());
  }

  getPost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + (this.getPostIndex(id))).once('value').then(
          (data: Datasnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  updatePost(post : Post)
  {
    const foundPost = this.posts.find((x) => x.Id == post.Id);
    foundPost.Title = post.Title;
    foundPost.Content = post.Content;
    foundPost.CreatedAt = post.CreatedAt.toJSON();
    foundPost.Score = post.Score;
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + (this.getPostIndex(post.Id))).set(foundPost).then(
          () => {
            this.onPostsUpdated();
            resolve();
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  private savePosts()
  {
    firebase.database().ref("/posts").set(this.posts);
  }
  
  createNewPost(title:string, content:string) {
    const nextId = this.posts.length > 0 ? this.posts[(this.posts.length - 1)].Id + 1 : 1;
    const newPost = new SerializedPost(nextId, title, content, new Date().toJSON(), 0);
    this.posts.push(newPost);
    this.savePosts();
    this.onPostsUpdated();
  }
  
  removePost(oldPost: Post) {
    this.posts.splice(this.getPostIndex(oldPost.Id), 1);
    this.savePosts();
    this.onPostsUpdated();
  }

  getPostIndex(postId:number)
  {
    return this.posts.findIndex(
      (x) => {
        if(x.Id === postId) {
          return true;
        }
      }
    );
  }
}
