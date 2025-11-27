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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2, Sparkles, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { mockLeaveRequests } from '@/lib/data';
import { format, formatDistanceToNow } from 'date-fns';
import { summarizeLeaveRequests } from '@/ai/flows/summarize-leave-requests';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LeaveManagementPage() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const pendingRequests = mockLeaveRequests.filter(req => req.status === 'Pending');

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary('');
    try {
      const formattedRequests = pendingRequests.map(req => ({
        ...req,
        status: 'Pending' as const // Type assertion
      }));
      const result = await summarizeLeaveRequests(formattedRequests);
      setSummary(result.summary);
    } catch (error) {
      console.error("Failed to summarize leave requests:", error);
      setSummary("Could not generate summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
        <Button onClick={handleSummarize} disabled={isLoading || pendingRequests.length === 0}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Summarize Requests
        </Button>
      </div>

      {summary && (
        <Alert>
          <Sparkles className="h-4 w-4 text-primary" />
          <AlertTitle>AI Summary of Pending Requests</AlertTitle>
          <AlertDescription>{summary}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Pending Leave Requests</CardTitle>
          <CardDescription>Review and act on new leave requests from employees.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead className="hidden md:table-cell">Reason</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No pending leave requests.
                  </TableCell>
                </TableRow>
              ) : (
                pendingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="font-medium">{request.userName}</div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(request.startDate), 'PP')} - {format(new Date(request.endDate), 'PP')}
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-sm truncate">{request.reason}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" /> Approve
                        </Button>
                        <Button variant="destructive" size="sm">
                           <ThumbsDown className="h-4 w-4 mr-2" /> Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
          <CardDescription>Overview of all past leave requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Decided</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeaveRequests.filter(r => r.status !== 'Pending').map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.userName}</TableCell>
                  <TableCell>
                    {format(new Date(request.startDate), 'PP')} - {format(new Date(request.endDate), 'PP')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={request.status === 'Approved' ? 'success' : 'destructive'}>
                      {request.status === 'Approved' ? <Check className="mr-1 h-3 w-3" /> : <X className="mr-1 h-3 w-3" />}
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{formatDistanceToNow(new Date(), { addSuffix: true })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
