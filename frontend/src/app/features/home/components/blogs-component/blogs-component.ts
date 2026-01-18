import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { Subject, throttleTime } from 'rxjs';
import { BlogService } from '../../../blog/services/blog.service';
import { BlogInterface } from '../../../../core/shared/interfaces/BlogInterface';
import { BlogCard } from '../../../blog/blog-card/blog-card';
import { SnackbarService } from '../../../../core/shared/components/snackbar/snackbar.service';

@Component({
  selector: 'app-blogs-component',
  imports: [BlogCard],
  templateUrl: './blogs-component.html',
  styleUrl: './blogs-component.scss',
})
export class BlogsComponent implements OnInit {
 
  blogService = inject(BlogService);
  loader = signal(false);
  
  snackbarService = inject(SnackbarService);

  page = 0;
  size = 10;
  ngOnInit(): void {
    this.loader.set(true);
    this.blogService.getBlogsHome(this.page, this.size).subscribe({
      next: (res) => {
        console.log(res);
        
        this.blogService.blogs.set(res);
      },
      error: () => {
        this.snackbarService.error('error while fetching blogs!');
      },
      complete: () => {
        this.loader.set(false);
      },
    });
  }

  @HostListener('window:scrollend', ['$event'])
  onScroll(event: Event) {
    console.log(window.innerWidth);
    console.log('=>', window.scrollY);
  }
}
