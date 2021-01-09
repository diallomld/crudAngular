import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

    posts?: any;
    currentPost?: Post;
    currentIndex = -1;
    title = '';

    pageSize = 5;
    pageSizes = [5, 10, 15];
    totalItems: number | undefined;
    page = 1;

    constructor(private postService: PostsService) { }

    ngOnInit(): void {
      this.retrievePosts();
    }

    retrievePosts(): void {
      this.postService.getAllPosts()
        .subscribe(
          data => {
            this.posts = data;
            console.log(data);
            this.totalItems = data.length;
          },
          error => {
            console.log(error);
          });
    }

    refreshListPost(): void {
      this.retrievePosts();
      this.currentPost = undefined;
      this.currentIndex = -1;
    }

    setActivePost(post: Post, index: number): void {
      this.currentPost = post;
      this.currentIndex = index;
    }

    removeAllPosts(): void {
      this.postService.deleteAllPosts()
        .subscribe(
          response => {
            console.log(response);
            this.refreshListPost();
          },
          error => {
            console.log(error);
          });
    }

    searchTitle(): void {
      this.postService.findPostByTitle(this.title)
        .subscribe(
          data => {
            this.posts = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
    handlePageChange(event: any): void {
      this.page = event;
      this.retrievePosts();
    }

    handlePageSizeChange(event: any): void {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrievePosts();
    }

}
