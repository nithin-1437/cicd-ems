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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileDown, Upload } from 'lucide-react';
import { mockUsers, mockPayslips } from '@/lib/data';
import { format } from 'date-fns';

export default function PayrollPage() {
    const employees = mockUsers.filter((user) => user.role === 'Employee');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Upload Payslip</CardTitle>
              <CardDescription>Upload a new payslip for an employee.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employee-select">Employee</Label>
                <Select>
                  <SelectTrigger id="employee-select">
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map(emp => (
                        <SelectItem key={emp.uid} value={emp.uid}>{emp.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="month-select">Payslip Month</Label>
                <Input id="month-select" type="month" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payslip-file">Payslip PDF</Label>
                <Input id="payslip-file" type="file" accept=".pdf" />
              </div>
              <Button className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Payslip
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Payslips</CardTitle>
              <CardDescription>History of all uploaded payslips.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead className="hidden md:table-cell">File Name</TableHead>
                    <TableHead className="hidden md:table-cell">Uploaded Date</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPayslips.map((payslip) => {
                    const user = mockUsers.find(u => u.uid === payslip.userId);
                    return (
                        <TableRow key={payslip.id}>
                            <TableCell>{user?.name}</TableCell>
                            <TableCell>{payslip.month}</TableCell>
                            <TableCell className="hidden md:table-cell">{payslip.fileName}</TableCell>
                            <TableCell className="hidden md:table-cell">
                            {format(new Date(payslip.uploadDate), 'PPP')}
                            </TableCell>
                            <TableCell>
                            <Button variant="outline" size="icon">
                                <FileDown className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                            </Button>
                            </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
