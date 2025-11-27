# **App Name**: SynergyEMS

## Core Features:

- Landing Page: Public-facing landing page with a modern SaaS design, featuring a Navbar with links and Login/Sign Up buttons.
- Secure Authentication: Firebase Authentication with Email/Password for secure user login and signup.
- Role-Based Redirection: Automatically redirect users to /admin-dashboard or /employee-dashboard based on their accountType stored in Firestore after login. Use auth tool
- Admin Dashboard: Dashboard for admins with stats widgets, employee management (add, view, edit, delete), payroll (upload payslips), and leave management (approve/reject requests).
- Employee Dashboard: Dashboard for employees with personal attendance summary, leave balance, profile update, leave application, and payslip download.
- Payslip Management: Allow employees to download their payslips. Admins should be able to upload them to Firebase storage.
- Leave Management System: System for leave requests and approvals, allowing employees to submit leave requests and admins to approve or reject them.

## Style Guidelines:

- Primary color: Deep navy blue (#1A237E), evoking professionalism and trust.
- Background color: Soft off-white (#F5F5F5) for a clean and modern aesthetic.
- Accent color: Muted teal (#4DB6AC) for interactive elements and highlights, providing a subtle contrast.
- Body and headline font: 'Inter' (sans-serif) for a modern, neutral, and readable design.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use minimalist, line-based icons for a clean and professional look.
- Maintain a clean and spacious layout with ample white space, dark navy/black buttons, and gray borders.