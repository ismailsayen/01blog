export interface StatiqueInfo {
    usersCount: number;
    blogsCount: number;
    reportsCount: number;
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
