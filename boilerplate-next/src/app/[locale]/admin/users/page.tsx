import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UsersTable } from "@/components/admin/UsersTable";

export default async function AdminUsersPage() {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/admin");
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      email: true,
      name: true,
      isAdmin: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight  text-black">
          Utilisateurs
        </h1>
        <p className="text-muted-foreground">
          Gérez les utilisateurs de votre application
        </p>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <UsersTable users={users} />
      </div>
    </div>
  );
}
