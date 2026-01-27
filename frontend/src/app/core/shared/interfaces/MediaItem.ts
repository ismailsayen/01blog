export interface MediaItem {
  file: File;
  previewUrl: string;
  cloudUrl?: string;
}

export interface ResponseMedia {
  previewUrl(previewUrl: any, newURL: string): string | null;
  OldUrl: string;
  newURL: string;
}