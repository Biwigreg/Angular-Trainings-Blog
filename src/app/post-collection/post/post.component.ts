import { Component, Input, OnInit } from '@angular/core';

import {Post} from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() Post : Post;

  constructor(private postService : PostService) { }

  ngOnInit() {
  }

  onLike(){
    this.Post.Score++;
    this.postService.updatePost(this.Post);
  }

  onDislike(){
    this.Post.Score--;
    this.postService.updatePost(this.Post);
  }

  onDelete()
  {
    if(confirm("Supprimer ce post?"))
    {
      this.postService.removePost(this.Post);
    }
  }
}
