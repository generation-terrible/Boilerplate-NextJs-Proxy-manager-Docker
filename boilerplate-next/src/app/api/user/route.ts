import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";

// GET: Liste tous les utilisateurs
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// POST: Ajoute un utilisateur admin
export async function POST(request: Request) {
  const data = await request.json();
  if (!data.email || !data.password || !data.acceptCgu) {
    return NextResponse.json(
      { error: "Email, mot de passe et acceptation des CGU requis" },
      { status: 400 }
    );
  }
  const hashedPassword = await bcryptjs.hash(data.password, 10);
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
