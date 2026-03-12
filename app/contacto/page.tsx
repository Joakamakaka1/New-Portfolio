import type { Metadata } from "next";
import ContactoContent from "@/components/features/contacto/ContactoContent";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con Joaquin Castro: disponible vía mensaje directo, LinkedIn, GitHub o correo electrónico.",
};

export default function Contacto() {
  return <ContactoContent />;
}
