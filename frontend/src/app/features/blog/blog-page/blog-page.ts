import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { BlogInterface, ReactionResponse } from '../../../core/shared/interfaces/BlogInterface';
import { SnackbarService } from '../../../core/shared/components/snackbar/snackbar.service';
import { HeaderCardBlog } from "../components/header-card-blog/header-card-blog";
import { BlogResult } from "../blog-result/blog-result";
import { ReportService } from '../../../core/services/reports/report.service';
import { ReportModal } from "../../../core/shared/components/report-modal/report-modal";

@Component({
  selector: 'app-blog-page',
  imports: [HeaderCardBlog, BlogResult, ReportModal],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.scss',
})
export class BlogPage implements OnInit {
  blogId = Number(inject(ActivatedRoute).snapshot.paramMap.get('id'))
  blogService = inject(BlogService)
  snackBar = inject(SnackbarService)
  router = inject(Router);
  reportService = inject(ReportService);

  blogDetails = signal<BlogInterface | null>(null)
  loader = signal<boolean>(false)
  Likeloader = signal<boolean>(false)

  ngOnInit(): void {
    if (Number.isNaN(this.blogId)) {
      this.snackBar.error('Invalid profile id');
      this.router.navigateByUrl('/');
      return;
    }
    this.loader.set(true)
    this.blogService.getAnyBLogById(this.blogId).subscribe({
      next: ((res) => {
        this.blogDetails.set(res)

      }),
      error: ((err) => {
        console.log("errrrr", err);

      }),
      complete: (() => {
        this.loader.set(false)
      })
    })
  }

  onClik(id: number) {
    this.Likeloader.set(true);
    this.blogService.ReactToBlog(id).subscribe({
      next: (res) => {
        const n = res.status ? 1 : -1;
        const blog = this.blogDetails()!
        this.blogDetails.set({ ...blog, likeCount: Math.max(0, blog.likeCount + n), liked: res.status });
        this.Likeloader.set(false);
      },
    });
  }

}
