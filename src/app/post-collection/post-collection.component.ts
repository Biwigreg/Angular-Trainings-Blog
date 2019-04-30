import { Component, OnInit } from '@angular/core';
import {Post} from "../models/post";
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-post-collection',
  templateUrl: './post-collection.component.html',
  styleUrls: ['./post-collection.component.scss']
})
export class PostCollectionComponent implements OnInit {

  Posts : Post[];
  private postSubscription : Subscription;
  constructor(private postService : PostService, private router: Router) { }

  ngOnInit() {
    this.postSubscription = this.postService.postsSubject.subscribe((posts: Post[]) => {
    this.Posts = posts;
   });
   this.Posts = this.postService.getPosts();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  onCreatePost(){
    this.router.navigate(['add']);
  }

  getPosts()
  {
    return this.Posts;
  }
}
