export interface BlogInterface {
  commentsCount: number;
  createdAt: Date;
  id: number;
  lastUpdateAt: Date | null;
  likeCount: number;
  userId: number;
  content: string;
  categorie: string;
  title: string;
  userName: string;
  job: string;
  avatar: string | null;
  image: string | null;
  liked: boolean;
  myBlog: boolean;
}



export interface ResponseMedia {
  previewUrl(previewUrl: any, newURL: string): string | null;
  OldUrl: string;
  newURL: string;
}

export interface ReactionResponse {
  blogId: number;
  status: boolean;
}
