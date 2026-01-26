import { inject, Injectable } from '@angular/core';
import { MediaItem } from '../../shared/interfaces/MediaItem';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../shared/api-url';
import { ResponseMedia } from '../../shared/interfaces/BlogInterface';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  mediaItems: MediaItem[] = [];
  http = inject(HttpClient)

  checkTextContainMedia(text: string | null | undefined) {

    this.mediaItems = this.mediaItems.filter((item) => {
      const exists = text?.includes(item.previewUrl);
      if (!exists) {
        URL.revokeObjectURL(item.previewUrl);
      }
      return exists;
    });
  }

  serveMediaLocaly(file: File): string | null {
    if (this.mediaItems.length > 4) {
      return null;
    }

    const existingItem = this.mediaItems.find(
      item =>
        item.file.name === file.name &&
        item.file.size === file.size &&
        item.file.lastModified === file.lastModified
    );

    if (existingItem) {
      return existingItem.previewUrl
    }

    const item: MediaItem = {
      file,
      previewUrl: URL.createObjectURL(file),
    };

    this.mediaItems.push(item);


    return item.previewUrl;
  }

  saveMedia(form: FormData) {
    return this.http.post<ResponseMedia>(API_URL + "/uploadMedia", form)
  }

  removeFiles() {
    this.mediaItems = this.mediaItems.filter((item) => {
      URL.revokeObjectURL(item.previewUrl);

    });
  }

  generateVideoHtml(url: string) {
    return `
<video width="320" height="240" controls>
  <source src="${url}" >
  Your browser does not support the video tag.
</video>
      `
  }
}
