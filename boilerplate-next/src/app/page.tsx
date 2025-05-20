import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon Super Boilerplate", // Ou le titre que vous voulez
  description: "Une description de mon application",
};

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Bienvenue sur ton Boilerplate Next.js ! 🚀</h1>
    </main>
  );
}
