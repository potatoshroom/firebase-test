"use client";

import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "active" | "inactive" | "pending";
  initials: string;
}

export function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData: User[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
      setUsers(usersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching users: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users from the database."
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const handleDelete = async (userId: string) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      toast({
        title: "Success",
        description: "User deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          A list of users from your Firebase database.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">Loading users...</TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">No users found.</TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="hidden sm:flex">
                        <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="person portrait" />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant={user.status === 'pending' ? 'secondary' : 'outline'}
                      className={user.status === 'active' ? 'bg-accent text-accent-foreground border-transparent hover:bg-accent/80' : ''}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem disabled>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(user.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
