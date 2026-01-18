import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_URL } from '../../../core/shared/api-url';
import { BlogInterface } from '../../../core/shared/interfaces/BlogInterface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  http = inject(HttpClient);
  blogs=signal<BlogInterface[]>([]);
  create(data: any) {
    return this.http.post<BlogInterface>(API_URL + '/blog', data);
  }
  getBlogsHome(page: number, size: number) {
    return this.http.get<BlogInterface[]>(API_URL + `/blog?page=${page}&size=${size}`).pipe(
      map((ele) => {
        console.log(ele);
        
        const pattern: RegExp = /!\[[^\]]*]\((https?:\/\/[^)]+)\)/;
        ele.forEach((blog) => {
          const match = pattern.exec(blog.content);
          if (match) {
            blog.content = blog.content.replace(match[0], '[IMAGE]');

            blog.image = match[1];
          }
          blog.content = blog.content.substring(0, 150);
        });
        return ele;
      })
    );
  }
}
