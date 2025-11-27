
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CalendarIcon, Check, PlusCircle, X } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { mockLeaveRequests, mockUsers } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';

export default function EmployeeLeavePage() {
  const { user } = useAuth();
  const [date, setDate] = useState<DateRange | undefined>();

  const userLeaveRequests = mockLeaveRequests.filter(req => req.userId === user?.uid);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Leave Requests</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Apply for Leave</CardTitle>
              <CardDescription>Submit a new request for time off.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date-range">Date Range</Label>
                 <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                        date.to ? (
                            <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                        ) : (
                        <span>Pick a date range</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea id="reason" placeholder="Please provide a reason for your leave..."/>
              </div>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>My Leave History</CardTitle>
              <CardDescription>Status of your past and present leave requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userLeaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{format(new Date(request.startDate), 'PP')}</TableCell>
                      <TableCell>{format(new Date(request.endDate), 'PP')}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === 'Approved'
                              ? 'success'
                              : request.status === 'Rejected'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                            {request.status === 'Approved' && <Check className="mr-1 h-3 w-3" />}
                            {request.status === 'Rejected' && <X className="mr-1 h-3 w-3" />}
                            {request.status}
                        </Badge>
                      </TableCell>
                       <TableCell className="hidden md:table-cell max-w-xs truncate">{request.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
