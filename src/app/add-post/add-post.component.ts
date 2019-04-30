import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  
  postForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private postService: PostService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
  
  onCreatePost() {
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    this.postService.createNewPost(title, content);
    this.router.navigate(['/posts']);
  }
}
