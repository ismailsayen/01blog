import { AfterViewInit, Component, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core'
import { BlogService } from '../../../blog/services/blog.service'
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
export class BlogsComponent implements AfterViewInit, OnInit, OnDestroy {
  blogService = inject(BlogService)
  snackbarService = inject(SnackbarService)
  reportService = inject(ReportService)
  observer = inject(ObserverService)

  loader = signal(false)
  allDataGeted = signal(false)
  lastId = signal<number>(0)

  @ViewChild('ob', { read: ElementRef })
  ob!: ElementRef

  ngAfterViewInit(): void {
    this.observer.createAndObserve(this.ob, this.fetchPosts.bind(this))
  }

  ngOnDestroy(): void {
    this.blogService.blogs.set([])
  }

  ngOnInit(): void {
    this.fetchPosts()
  }


  fetchPosts() {
    if (this.loader() || this.allDataGeted()) {
      return
    }

    this.loader.set(true)
    this.blogService.getBlogsHome(this.lastId()).subscribe({
      next: (res) => {
        if (res.length === 0) {
          this.allDataGeted.set(true)
          return
        }

        this.lastId.set(res[res.length - 1].id!)
        this.blogService.blogs.set([...this.blogService.blogs(), ...res])
      },
      error: () => {
        this.snackbarService.error('error while fetching blogs!')
      },
      complete: () => {
        this.loader.set(false)
      },
    })
  }

}
