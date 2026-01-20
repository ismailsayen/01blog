import { AfterViewInit, Component, ElementRef, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core'
import { Subject, throttleTime } from 'rxjs'
import { BlogService } from '../../../blog/services/blog.service'
import { BlogInterface } from '../../../../core/shared/interfaces/BlogInterface'
import { BlogCard } from '../../../blog/blog-card/blog-card'
import { SnackbarService } from '../../../../core/shared/components/snackbar/snackbar.service'
import { ReportService } from '../../../../core/services/reports/report.service'
import { ObserverService } from '../../../../core/services/observer/observer.service'

@Component({
  selector: 'app-blogs-component',
  imports: [BlogCard],
  templateUrl: './blogs-component.html',
  styleUrl: './blogs-component.scss',
})
export class BlogsComponent implements AfterViewInit, OnInit {
  blogService = inject(BlogService)
  loader = signal(false)
  snackbarService = inject(SnackbarService)
  reportService = inject(ReportService)
  page = 0
  size = 10
  observer = inject(ObserverService)
  @ViewChild('ob', { read: ElementRef })
  ob!: ElementRef

  ngAfterViewInit(): void {
    this.observer.createAndObserve(this.ob)

  }

  ngOnInit(): void {
    this.loader.set(true)
    this.blogService.getBlogsHome(this.page, this.size).subscribe({
     
      error: () => {
        this.snackbarService.error('error while fetching blogs!')
      },
      complete: () => {
        this.loader.set(false)
      },
    })
  }


}
