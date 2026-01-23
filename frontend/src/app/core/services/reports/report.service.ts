import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { API_URL } from '../../shared/api-url'

interface ReportMessage {
  Message: string
}
@Injectable({
  providedIn: 'root',
})
export class ReportService {
  showReport = signal<boolean>(false)
  showConfirmation = signal<boolean>(false)
  loader = signal<boolean>(false)
  id = signal<number>(0)
  type = signal<string>("")
  userName = signal<string>("")
  http = inject(HttpClient)
  show(id: number, type: string, userName: string) {
    console.log("ss");

    this.id.set(id)
    this.type.set(type)
    this.userName.set(userName)
    this.showReport.set(true)
  }

  showConfirm() {
    this.showConfirmation.set(true)
  }
  hideConfirm() {
    this.showConfirmation.set(false)
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
    console.log(body);

    this.loader.set(true)
    return this.http.post<ReportMessage>(API_URL + "/report", body)
  }
}
