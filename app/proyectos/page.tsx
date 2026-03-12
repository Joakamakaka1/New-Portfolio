import type { Metadata } from "next";
import ProyectosContent from "@/components/features/projects/ProyectosContent";
import { PROJECTS } from "@/constants";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos desarrollados por Joaquin Castro: Valorant Fantasy, Aurevia y más aplicaciones fullstack.",
};

export default function Proyectos() {
  return <ProyectosContent projects={PROJECTS} />;
}
