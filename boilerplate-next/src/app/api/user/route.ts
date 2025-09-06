import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// GET: récupère tous les utilisateurs (optionnel)
export async function GET() {
  return NextResponse.json(
    { message: "API utilisateur fonctionnelle" },
    { status: 200 }
  );
}

// POST: Ajoute un utilisateur admin
export async function POST(request) {
  try {
    const data = await request.json();
    if (!data.email || !data.password || !data.acceptCgu) {
      return NextResponse.json(
        { error: "Email, mot de passe et acceptation des CGU requis" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Un utilisateur avec cet email existe déjà" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name || null,
        isAdmin: data.isAdmin === true,
        passwordHash: hashedPassword,
      },
    });

    // Ne pas retourner le mot de passe hashé
    const { passwordHash, ...safeUser } = user;
    return NextResponse.json(safeUser, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la création de l'utilisateur" },
      { status: 500 }
    );
  }
}
