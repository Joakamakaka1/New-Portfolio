import type { Metadata } from "next";
import HabilidadesContent from "@/components/features/habilidades/HabilidadesContent";
import { SKILLS_DATA } from "@/constants";

export const metadata: Metadata = {
  title: "Habilidades",
  description:
    "Tecnologías y habilidades de Joaquin Castro: React, Next.js, TypeScript, Python, FastAPI, Docker y más.",
};

export default function Habilidades() {
  return <HabilidadesContent skills={SKILLS_DATA} />;
}
