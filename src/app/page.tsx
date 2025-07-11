import { UserForm } from "@/components/user-form";
import { UserTable } from "@/components/user-table";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground/90 sm:text-5xl font-headline bg-primary rounded-lg py-2">
            Firebase Placeholder
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A simple interface to display and manage users from a Firebase database.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <UserForm />
          </div>
          <div className="lg:col-span-2">
            <UserTable />
          </div>
        </div>
      </main>
    </div>
  );
}
