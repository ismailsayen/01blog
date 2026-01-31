export interface StatiqueInfo {
  usersCount: number;
  blogsCount: number;
  reportsCount: number;
}
export interface StatiqueUsers {
  usersCount: number;
  BannnedCount: number;
  ActiveCount: number;
}

export interface StatiqueBlogs {
  blogsCount: number;
  activeCount: number;
  hiddenCount: number;
}


export interface ReportsData {
  id: number;
  reason: string;
  reportedAt: Date;
  resolved: boolean;
  targetId: number;
  targetType: string;
  reportedBy: number;
  userName: string;
}

export interface UsersData {
  id: number;
  avatar: string | null;
  role: string;
  joined: Date;
}

export interface BlogsData {
         id:number;
         title:string;
         created_at:Date;
         status:boolean;
         author:string;
    }
