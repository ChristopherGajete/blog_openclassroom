import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/Post.model';
import { PostService } from '../../services/post.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  post: Post;
  @Input() index: number;
  loved: string;
  created_at: Date;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.post = new Post('', '');
    const id = this.index;
    this.postService.getSinglePost(+id).then(
      (post: Post) => {
        this.post = post;

      }
    );
    this.postService.loveIts = this.post.loveIts;
    console.log('There is ' + this.post.loveIts + ' loveIts');
    console.log('There is ' + this.postService.loveIts + ' loveIts');
    this.lovedMethod();
    this.created_at = new Date(this.post.created_at);
  }

  onDeletePost() {
    this.postService.removePost(this.post);
  }

  onIsLoved(love: boolean) {
    this.post.loveIts += love ? +1 : -1;
    this.postService.loveIts = this.post.loveIts;
    console.log('There is ' + this.postService.loveIts + 'loveIts');
    this.lovedMethod();
    //this.updateLoveIts();
  }

  lovedMethod() {
    if (this.post.loveIts === 0) {
      this.loved = '';
    } else if (this.post.loveIts > 0) {
      this.loved = 'yes';
    } else if (this.post.loveIts < 0) {
      this.loved = 'no';
    }
  }

  updateLoveIts() {
    firebase.database().ref('/posts/' + this.index ).update({
      content: this.post.content,
      created_at: this.post.created_at,
      loveIts: this.post.loveIts,
      title: this.post.title
    });
  }

}
