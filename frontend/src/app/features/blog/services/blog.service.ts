import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_URL } from '../../../core/shared/api-url';
import { BlogInterface, ReactionResponse } from '../../../core/shared/interfaces/BlogInterface';
import { delay, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  http = inject(HttpClient);
  blogs = signal<BlogInterface[]>([]);

  create(data: any) {
    return this.http.post<BlogInterface>(API_URL + '/blog', data);
  }
  getBlogsHome(page: number, size: number) {

    return this.http.get<BlogInterface[]>(API_URL + `/blog?page=${page}&size=${size}`).pipe(
      map((ele) => {
        const pattern: RegExp = /!\[[^\]]*]\((https?:\/\/[^)]+)\)/mg;
        ele.forEach((blog) => {
          blog.content = blog.content.substring(0, 500);
          const matches = [...blog.content.matchAll(pattern)];

          matches.forEach((match, i) => {
            blog.content = blog.content.replaceAll(match[0], '[IMAGE]');
            blog.image = match[1];
          })
        });
        return ele;
      }),
      tap((res) => {
        this.blogs.set([...this.blogs(), ...res])
      })
    );
  }
  ReactToBlog(blogId: number) {
    return this.http.post<ReactionResponse>(API_URL + `/reaction/${blogId}`, null);
  }
}
