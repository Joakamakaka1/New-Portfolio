import type { Metadata } from "next";
import ExperienciaContent from "@/components/features/experiencia/ExperienciaContent";
import { EXPERIENCE_DATA, STUDIES_DATA } from "@/constants";

export const metadata: Metadata = {
  title: "Experiencia",
  description:
    "Historial profesional y formación académica de Joaquin Castro: Fullstack Developer con experiencia en Next.js, React, FastAPI y más.",
};

export default function Experiencia() {
  return <ExperienciaContent experience={EXPERIENCE_DATA} studies={STUDIES_DATA} />;
}
