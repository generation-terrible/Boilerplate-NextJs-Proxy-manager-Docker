"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, Shield, User } from "lucide-react";
import { updateUser, deleteUser } from "@/app/[locale]/admin/users/actions";
import toast from "react-hot-toast";

interface User {
  id: string;
  email: string | null;
  name: string | null;
  isAdmin: boolean;
  createdAt: Date;
}

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users: initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setEditForm({
      name: user.name || "",
      email: user.email || "",
      isAdmin: user.isAdmin,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    const loadingToast = toast.loading("Modification en cours...");

    try {
      const updatedUser = await updateUser(editingUser.id, editForm);
      setUsers(
        users.map((user) => (user.id === editingUser.id ? updatedUser : user))
      );
      setIsEditDialogOpen(false);
      setEditingUser(null);
      toast.success("Utilisateur modifié avec succès !", { id: loadingToast });
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Erreur lors de la modification de l'utilisateur", {
        id: loadingToast,
      });
    }
  };

  const handleDelete = async (userId: string) => {
    const loadingToast = toast.loading("Suppression en cours...");

    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("Utilisateur supprimé avec succès !", { id: loadingToast });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Erreur lors de la suppression de l'utilisateur", {
        id: loadingToast,
      });
    }
  };

  const formatDate = (date: Date) => {
    if (!isClient) {
      // Pendant l'hydratation, retourner une valeur stable
      return "...";
    }

    const dateObj = new Date(date);
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(dateObj);
  };

  const adminCount = users.filter((user) => user.isAdmin).length;
  const userCount = users.length - adminCount;

  return (
    <div className="overflow-hidden">
      {/* En-tête avec statistiques */}
      <div className="border-b bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium text-foreground">
                Total: {users.length} utilisateur{users.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
              <span className="text-sm font-medium text-foreground">
                Admins: {adminCount}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-foreground">
                Utilisateurs: {userCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b bg-muted/50">
            <TableHead className="font-semibold text-foreground">Nom</TableHead>
            <TableHead className="font-semibold text-foreground">
              Email
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Rôle
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Date d'inscription
            </TableHead>
            <TableHead className="text-right font-semibold text-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-muted-foreground"
              >
                Aucun utilisateur trouvé.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user, index) => (
              <TableRow
                key={user.id}
                className={`border-b transition-colors hover:bg-muted/50 ${
                  index % 2 === 0 ? "bg-background" : "bg-muted/20"
                }`}
              >
                <TableCell className="font-medium text-foreground">
                  {user.name || "Sans nom"}
                </TableCell>
                <TableCell className="text-foreground">{user.email}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {user.isAdmin ? (
                      <Shield className="h-4 w-4 text-amber-500" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span
                      className={`text-sm ${
                        user.isAdmin
                          ? "text-amber-600 font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "Utilisateur"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(user)}
                        className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Modifier l'utilisateur</DialogTitle>
                        <DialogDescription>
                          Modifiez les informations de l'utilisateur.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Nom
                          </Label>
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                email: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="isAdmin" className="text-right">
                            Admin
                          </Label>
                          <div className="col-span-3 flex items-center space-x-2">
                            <Checkbox
                              id="isAdmin"
                              checked={editForm.isAdmin}
                              onCheckedChange={(checked) =>
                                setEditForm({
                                  ...editForm,
                                  isAdmin: checked as boolean,
                                })
                              }
                            />
                            <label htmlFor="isAdmin" className="text-sm">
                              Accès administrateur
                            </label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditDialogOpen(false)}
                        >
                          Annuler
                        </Button>
                        <Button onClick={handleSaveEdit}>Sauvegarder</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Supprimer l'utilisateur
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Êtes-vous sûr de vouloir supprimer cet utilisateur ?
                          Cette action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
