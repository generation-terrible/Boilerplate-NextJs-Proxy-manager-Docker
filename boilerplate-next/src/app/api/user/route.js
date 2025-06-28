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
  const data = await request.json();
  if (!data.email || !data.password || !data.acceptCgu) {
    return NextResponse.json(
      { error: "Email, mot de passe et acceptation des CGU requis" },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name || null,
      isAdmin: data.isAdmin === true,
      passwordHash: hashedPassword,
      // Ajoute ici d'autres champs si besoin
    },
  });
  return NextResponse.json(user, { status: 201 });
}
