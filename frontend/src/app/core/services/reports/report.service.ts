import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { API_URL } from '../../shared/api-url'
import { DeletionResponse, ReportMessage } from '../../shared/interfaces/BlogInterface'
import { finalize } from 'rxjs'
import { Resolve } from '../../shared/interfaces/userDTO'


@Injectable({
  providedIn: 'root',
})
export class ReportService {
  showReport = signal<boolean>(false)
  http = inject(HttpClient)
  showConfirmation = signal<boolean>(false)
  ConfirmAction = signal<boolean>(false)

  loader = signal<boolean>(false)
  id = signal<number>(0)
  type = signal<string>("")
  userName = signal<string>("")
  action = signal<string>('')

  show(id: number, type: string, userName: string, action: string) {

    this.id.set(id)
    this.type.set(type)
    this.userName.set(userName)
    this.action.set(action)
    this.showReport.set(true)
  }

  showConfirm() {
    this.showConfirmation.set(true)
  }

  hideConfirm() {
    this.showConfirmation.set(false)
    this.ConfirmAction.set(false)

  }

  showConfirmAction(id: number, type: string, userName: string, action: string) {
    this.id.set(id)
    this.type.set(type)
    this.userName.set(userName)
    this.action.set(action)
    this.ConfirmAction.set(true)
  }

  hide() {
    this.showReport.set(false)
  }

  reportBlogOrProfile(reason: string | null) {
    const body = {
      reason,
      targetId: this.id(),
      targetType: this.type().toUpperCase()
    }
    this.loader.set(true)
    return this.http.post<ReportMessage>(API_URL + "/report", body)
  }
  deleteBlog() {
    this.loader.set(true)
    return this.http.delete<DeletionResponse>(API_URL + `/blog/${this.id()}`).pipe(
      finalize(() => {
        this.loader.set(false)
        this.ConfirmAction.set(false)
      })
    )
  }

  deleteComment() {
    this.loader.set(true)
    return this.http.delete<DeletionResponse>(API_URL + `/comment/${this.id()}`).pipe(
      finalize(() => {
        this.loader.set(false)
        this.ConfirmAction.set(false)
      })
    )
  }

  ResolveReport() {
    this.loader.set(true)
    return this.http.patch<Resolve>(API_URL + `/report/resolve/${this.id()}`, null).pipe(
      finalize(() => {
        this.loader.set(false)
        this.ConfirmAction.set(false)
      })
    )
  }
  RejectReport() {
    this.loader.set(true)
    return this.http.delete<Resolve>(API_URL + `/report/${this.id()}`).pipe(
      finalize(() => {
        this.loader.set(false)
        this.ConfirmAction.set(false)
      })
    )
  }

}
