'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
  };
  
  if (!user) {
    return null; // Or a loading state
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="text-3xl">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.department} Department</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Personal Information</h3>
                    <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input value={user.email} readOnly disabled/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 (555) 000-0000"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="123 Main St, Anytown, USA"/>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Employment Details</h3>
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Input value={user.role} readOnly disabled/>
                    </div>
                    <div className="space-y-2">
                        <Label>Salary</Label>
                        <Input value={`$${user.salary.toLocaleString()}`} readOnly disabled/>
                         <p className="text-xs text-muted-foreground">Salary information is confidential and cannot be changed here.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Joined Date</Label>
                        <Input value={format(new Date(user.joinedDate), 'PPP')} readOnly disabled/>
                    </div>
                </div>
            </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
