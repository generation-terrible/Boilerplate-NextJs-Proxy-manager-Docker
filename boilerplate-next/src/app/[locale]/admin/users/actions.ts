'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateUser(
  userId: string,
  data: {
    name: string;
    email: string;
    isAdmin: boolean;
  }
) {
  const session = await auth();
  
  if (!session?.user?.isAdmin) {
    throw new Error('Unauthorized');
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name || null,
        email: data.email || null,
        isAdmin: data.isAdmin,
      },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true,
        createdAt: true,
      }
    });

    revalidatePath('/admin/users');
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
}

export async function deleteUser(userId: string) {
  const session = await auth();
  
  if (!session?.user?.isAdmin) {
    throw new Error('Unauthorized');
  }

  // Empêcher l'auto-suppression
  if (session.user.id === userId) {
    throw new Error('Cannot delete your own account');
  }

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      }
    });

    revalidatePath('/admin/users');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
}