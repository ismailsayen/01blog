export interface BlogInterface {
  commentsCount: number;
  createdAt: Date;
  id: number;
  lastUpdateAt: Date | null;
  likeCount: number;
  userId: number;
  content: number;
  categorie: number;
  title: number;
  userName: number;
}


export interface ResponseMedia {
  previewUrl(previewUrl: any, newURL: string): string | null;
  OldUrl: string;
  newURL: string;
}
