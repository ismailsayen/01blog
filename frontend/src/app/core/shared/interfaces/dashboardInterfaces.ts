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
