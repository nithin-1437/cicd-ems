'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download } from 'lucide-react';
import { mockPayslips } from '@/lib/data';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';

export default function EmployeePayrollPage() {
    const { user } = useAuth();
    const userPayslips = user ? mockPayslips.filter(p => p.userId === user.uid) : [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">My Payslips</h1>

      <Card>
        <CardHeader>
          <CardTitle>Payroll History</CardTitle>
          <CardDescription>Access and download your monthly payslips.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead className="hidden md:table-cell">Date Uploaded</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userPayslips.map((payslip) => (
                <TableRow key={payslip.id}>
                  <TableCell className="font-medium">{payslip.month}</TableCell>
                  <TableCell>{payslip.fileName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(payslip.uploadDate), 'PPP')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
