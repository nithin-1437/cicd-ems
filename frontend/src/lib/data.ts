import { User, LeaveRequest, Payslip } from "@/types";
import { PlaceHolderImages } from "./placeholder-images";

const avatar1 = PlaceHolderImages.find(img => img.id === 'avatar-1')?.imageUrl;
const avatar2 = PlaceHolderImages.find(img => img.id === 'avatar-2')?.imageUrl;
const avatar3 = PlaceHolderImages.find(img => img.id === 'avatar-3')?.imageUrl;
const avatar4 = PlaceHolderImages.find(img => img.id === 'avatar-4')?.imageUrl;
const avatar5 = PlaceHolderImages.find(img => img.id === 'avatar-5')?.imageUrl;


export const mockUsers: User[] = [
  {
    uid: 'admin001',
    name: 'Admin User',
    email: 'admin@synergy.ems',
    role: 'Admin',
    department: 'Management',
    salary: 120000,
    joinedDate: '2020-01-15T00:00:00Z',
    avatarUrl: avatar5,
  },
  {
    uid: 'user001',
    name: 'John Doe',
    email: 'john.doe@synergy.ems',
    role: 'Employee',
    department: 'Engineering',
    salary: 80000,
    joinedDate: '2021-06-01T00:00:00Z',
    avatarUrl: avatar1,
  },
  {
    uid: 'user002',
    name: 'Jane Smith',
    email: 'jane.smith@synergy.ems',
    role: 'Employee',
    department: 'Marketing',
    salary: 75000,
    joinedDate: '2022-03-10T00:00:00Z',
    avatarUrl: avatar2,
  },
    {
    uid: 'user003',
    name: 'Peter Jones',
    email: 'peter.jones@synergy.ems',
    role: 'Employee',
    department: 'Engineering',
    salary: 95000,
    joinedDate: '2020-11-20T00:00:00Z',
    avatarUrl: avatar3,
  },
  {
    uid: 'user004',
    name: 'Mary Williams',
    email: 'mary.williams@synergy.ems',
    role: 'Employee',
    department: 'Sales',
    salary: 90000,
    joinedDate: '2023-01-30T00:00:00Z',
    avatarUrl: avatar4,
  },
];

export const mockLeaveRequests: LeaveRequest[] = [
    {
        id: 'leave001',
        userId: 'user001',
        userName: 'John Doe',
        startDate: '2024-08-10T00:00:00Z',
        endDate: '2024-08-15T00:00:00Z',
        reason: 'Family vacation.',
        status: 'Pending',
    },
    {
        id: 'leave002',
        userId: 'user002',
        userName: 'Jane Smith',
        startDate: '2024-07-25T00:00:00Z',
        endDate: '2024-07-26T00:00:00Z',
        reason: 'Personal appointment.',
        status: 'Approved',
    },
    {
        id: 'leave003',
        userId: 'user003',
        userName: 'Peter Jones',
        startDate: '2024-08-01T00:00:00Z',
        endDate: '2024-08-05T00:00:00Z',
        reason: 'Conference attendance.',
        status: 'Pending',
    },
    {
        id: 'leave004',
        userId: 'user004',
        userName: 'Mary Williams',
        startDate: '2024-07-20T00:00:00Z',
        endDate: '2024-07-20T00:00:00Z',
        reason: 'Feeling unwell.',
        status: 'Rejected',
    },
];

export const mockPayslips: Payslip[] = [
    {
        id: 'payslip001',
        userId: 'user001',
        month: 'June 2024',
        fileName: 'Payslip_JohnDoe_June2024.pdf',
        downloadUrl: '#',
        uploadDate: '2024-07-01T00:00:00Z',
    },
    {
        id: 'payslip002',
        userId: 'user001',
        month: 'May 2024',
        fileName: 'Payslip_JohnDoe_May2024.pdf',
        downloadUrl: '#',
        uploadDate: '2024-06-01T00:00:00Z',
    },
    {
        id: 'payslip003',
        userId: 'user002',
        month: 'June 2024',
        fileName: 'Payslip_JaneSmith_June2024.pdf',
        downloadUrl: '#',
        uploadDate: '2024-07-01T00:00:00Z',
    }
];
