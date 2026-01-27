import { AfterViewInit, Component, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { commentInterface } from '../../../core/shared/interfaces/BlogInterface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackbarService } from '../../../core/shared/components/snackbar/snackbar.service';
import { finalize } from 'rxjs';
import { ObserverService } from '../../../core/services/observer/observer.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ReportService } from '../../../core/services/reports/report.service';
import { ConfirmationPopUp } from "../../../core/shared/components/confirmation-pop-up/confirmation-pop-up";

@Component({
  selector: 'app-comments',
  imports: [ReactiveFormsModule, ConfirmationPopUp],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments implements OnInit, AfterViewInit {
  blogId = input.required<number>()

  allDataGeted = signal(false)
  loader = signal<boolean>(false)
  loaderCmnt = signal<boolean>(false)
  lastId = signal<number>(0)
  commentsInfo = signal<commentInterface[]>([])

  commentContent = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(500)])

  reportService = inject(ReportService)
  blogService = inject(BlogService)
  snackBar = inject(SnackbarService)
  observer = inject(ObserverService)
  authService = inject(AuthService)

  @ViewChild('cm', { read: ElementRef })
  cm!: ElementRef

  ngAfterViewInit(): void {
    this.observer.createAndObserve(this.cm, this.fetchComments.bind(this))
  }

  ngOnInit(): void {
    this.fetchComments()
  }

  onClick() {
    if (this.commentContent.invalid) {
      return
    }

    this.loader.set(true)
    this.blogService.addComment(this.blogId(), this.commentContent.value!).pipe(
      finalize(() => {
        this.loader.set(false)
      })
    ).subscribe({
      next: ((res) => {
        this.commentsInfo.set([res, ...this.commentsInfo()])
        this.commentContent.reset('', { emitEvent: false });
        this.snackBar.success('Comment added successfully')
      }),
      error: (() => {
        this.snackBar.error('Failed to add your comment!')
      }),

    })
  }

  deleteComment() {
    this.reportService.deleteComment().subscribe({
      next: ((res) => {
        this.commentsInfo.update(cmnts =>
          cmnts.filter(cmt => cmt.id !== res.id)
        )
        this.snackBar.success(res.action)
      }),
      error: ((err) => {
        if (err.status === 403) {
          this.snackBar.error("You dont't have permission to delete this comment.")
          return
        }
        if (err.status === 404) {
          this.snackBar.error("Comment not Found so you can delete anything.")
          return
        }
        this.snackBar.error("Error while delete comment.")

      })
    })
  }

  fetchComments() {
    if (this.loaderCmnt() || this.allDataGeted()) {
      return
    }
    this.loaderCmnt.set(true)
    this.blogService.getComments(this.blogId(), this.lastId()).pipe(finalize(() => { this.loaderCmnt.set(false) })).subscribe({
      next: ((res) => {
        if (res.length === 0) {
          this.allDataGeted.set(true)
          return
        }

        this.commentsInfo.set([...this.commentsInfo(), ...res])
        this.lastId.set(res[res.length - 1].id!)
      }),
      error: (() => {
        this.snackBar.error('error while Fetching Comments.')
      })
    })
  }
}
