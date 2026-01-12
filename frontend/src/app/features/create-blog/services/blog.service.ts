import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../core/shared/api-url';
import { BlogInterface } from '../../../core/shared/interfaces/BlogInterface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  http = inject(HttpClient)
  create(data: any) {
    return this.http.post<BlogInterface>(API_URL + "/blog", data)
  }
}
