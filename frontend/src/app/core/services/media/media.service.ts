import { Injectable } from '@angular/core';
import { MediaItem } from '../../shared/interfaces/MediaItem';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  mediaItems: MediaItem[] = [];

  checkTextContainMedia(text: string | null | undefined) {
    this.mediaItems = this.mediaItems.filter((item) => {
      const exists = text?.includes(item.previewUrl);
      if (!exists) {
        URL.revokeObjectURL(item.previewUrl);
      }
      return exists;
    });
  }
  serveMediaLocaly(file: File) {
    if (this.mediaItems.length > 4) {
      return null;
    }
    const item: MediaItem = {
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
    };
    this.mediaItems.push(item);

    return item.previewUrl  ;
  }
}
