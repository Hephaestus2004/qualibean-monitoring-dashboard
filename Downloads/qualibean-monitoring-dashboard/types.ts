export type UserRole = 'admin' | 'viewer';
export type View = 'dashboard' | 'analytics' | 'logs' | 'users' | 'settings';
export type SystemStatus = 'Running' | 'Idle' | 'Error';

export interface LogEntry {
  id: number;
  timestamp: string;
  type: 'INFO' | 'ERROR' | 'EVENT';
  message: string;
}

export interface PassFailTrendData {
  name: string; // Represents a point in time or a sub-batch
  passed: number;
  failed: number;
}

export interface Batch {
    id: string;
    name: string;
    passFailTrend: PassFailTrendData[];
    beanDistribution: { name: string; value: number }[];
    roastDistribution: { name: string; value: number }[];
    binWeights: { time: string; passWeight: number; failWeight: number }[];
    predictedStalenessDays: number;
}

export interface RecentBean {
  id: number;
  timestamp: string;
  type: 'Arabica' | 'Robusta';
  roast: 'Light' | 'Medium' | 'Dark';
  status: 'Pass' | 'Fail';
}
