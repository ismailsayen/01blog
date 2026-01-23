import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API_URL } from '../../../core/shared/api-url';
import { BlogInterface, ReactionResponse } from '../../../core/shared/interfaces/BlogInterface';
import { catchError, delay, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  http = inject(HttpClient);
  blogs = signal<BlogInterface[] >([]);

  create(data: any) {
    return this.http.post<BlogInterface>(API_URL + '/blog', data);
  }
  getBlogsHome(page: number, size: number) {

    return this.http.get<BlogInterface[]>(API_URL + `/blog?page=${page}&size=${size}`).pipe(
      map((ele) => {
        const imagePattern: RegExp = /!\[[^\]]*]\((https?:\/\/[^)]+)\)/mg;
        const videoPattern: RegExp = /<video\b[^>]*>[\s\S]*?<\/video>/gm

        ele.forEach((blog) => {
          const Imagematches = [...blog.content.matchAll(imagePattern)];
          const VideoMatches = [...blog.content.matchAll(videoPattern)];

          blog.image = Imagematches.length > 1 ? Imagematches[0][1] : null;

          Imagematches.forEach((match) => {
            blog.content = blog.content.replaceAll(match[0], '[IMAGE]');
          })

          VideoMatches.forEach((match) => {
            blog.content = blog.content.replaceAll(match[0], '[VIDEO]');
          })

          blog.content = blog.content.substring(0, 500);
        });
        return ele;
      }),
      tap((res) => {
        this.blogs.set([...this.blogs(), ...res])
      }),
      catchError((err) => {
        console.log(err);
        return of(err)
      })
    );
  }

  getProfileBlogs(profileId: number | null | undefined) {

    return this.http.get<BlogInterface[]>(API_URL + `/blog/user/${profileId}`).pipe(
      map((ele) => {
        const imagePattern: RegExp = /!\[[^\]]*]\((https?:\/\/[^)]+)\)/mg;
        const videoPattern: RegExp = /<video\b[^>]*>[\s\S]*?<\/video>/gm

        ele.forEach((blog) => {
          const Imagematches = [...blog.content.matchAll(imagePattern)];
          const VideoMatches = [...blog.content.matchAll(videoPattern)];

          blog.image = Imagematches.length > 1 ? Imagematches[0][1] : null;

          Imagematches.forEach((match) => {
            blog.content = blog.content.replaceAll(match[0], '[IMAGE]');
          })

          VideoMatches.forEach((match) => {
            blog.content = blog.content.replaceAll(match[0], '[VIDEO]');
          })

          blog.content = blog.content.substring(0, 500);
        });
        return ele;
      }),
      tap((res) => {
        this.blogs.set([...this.blogs(), ...res])
      }),
      catchError((err) => {
        console.log(err);
        return of(err)
      })
    );
  }
  ReactToBlog(blogId: number) {
    return this.http.post<ReactionResponse>(API_URL + `/reaction/${blogId}`, null);
  }
}
