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

export interface ProfileData {
  id: number;
  userName: string;
  job: string;
  avatar: string;
  createdAt: Date;
  followers: number;
  following: number;
  followed: boolean;
  MyAccount: boolean;
}
export interface SearchedUsers {
  id: number;
  userName: string;
  job: string;
  avatar: string;
  followed: boolean;
}


export interface Resolve {
  reportID: number;
  message: string;
}

export interface ActionResponse {
  id: number;
  status: boolean;
}

export interface UsersData {
  id: number;
  avatar: string | null;
  userName: string;
  role: string;
  banned: boolean;
  joined: Date;
}

export interface NotificationsData {
  id: number;
  createdAt: Date;
  readed: boolean;
  userName: string;
  avatar: string | null;
}
