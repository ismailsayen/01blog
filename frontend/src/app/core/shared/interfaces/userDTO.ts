export interface User {
  id: number;
  avatar: string;
  userName: string;
  email: string;
  job: string;
  createdAt: Date;
  role: string;
  token: string;
}


export interface followResponse {
  userId: number;
  status: boolean;
  action: string;
}