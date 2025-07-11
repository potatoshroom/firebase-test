"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

type UserFormValues = z.infer<typeof formSchema>;

export function UserForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "users"), {
        ...data,
        status: "active",
        initials: `${data.firstName.charAt(0)}${data.lastName.charAt(0)}`.toUpperCase(),
      });
      console.log("Document written with ID: ", docRef.id);
      toast({
        title: "Success",
        description: "User added successfully.",
      });
      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add user.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New User</CardTitle>
        <CardDescription>
          Enter the details of the new user below.
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" {...form.register("firstName")} />
              {form.formState.errors.firstName && <p className="text-destructive text-sm">{form.formState.errors.firstName.message}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" {...form.register("lastName")} />
              {form.formState.errors.lastName && <p className="text-destructive text-sm">{form.formState.errors.lastName.message}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" {...form.register("email")} />
              {form.formState.errors.email && <p className="text-destructive text-sm">{form.formState.errors.email.message}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {loading ? "Adding..." : "Add User"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
