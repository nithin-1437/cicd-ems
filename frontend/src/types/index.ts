export type UserRole = 'Admin' | 'Employee';

export interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  salary: number;
  joinedDate: string; // ISO 8601 format
  avatarUrl?: string;
}

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  reason: string;
  status: LeaveStatus;
}

export interface Payslip {
  id: string;
  userId: string;
  month: string; // e.g., "January 2024"
  fileName: string;
  downloadUrl: string;
  uploadDate: string; // ISO 8601 format
}
