# Portfolio - Console OS Edition

Este es mi portfolio personal, diseñado y desarrollado con una interfaz iterativa que busca replicar de manera "pixel-perfect" el sistema operativo de la Nintendo Switch, ofreciendo una experiencia interactiva y fluida directamente en el navegador.

## 🏗️ Arquitectura y Estructura

El proyecto ha sido recientemente reestructurado siguiendo un patrón de **Diseño Orientado a Features (Feature-based Design)** para maximizar la escalabilidad y mantenibilidad:

- **`components/features/`**: Lógica organizada por dominios (Proyectos, Home, Contacto).
- **`components/shared/`**: Componentes globales reutilizables (Sidebar, Header, Layout).
- **`lib/services/`**: Capa de abstracción para servicios externos (Github, CMS).
- **`types/`**: Sistema de tipos unificado para asegurar la integridad de datos en toda la aplicación.

## 🚀 Optimización y Rendimiento

Se han implementado las últimas características de **Next.js 15+** para un rendimiento superior:

- **React Server Components (RSC):** Mayoría de las páginas renderizadas en el servidor para un SEO óptimo y menor bundle size de JavaScript.
- **Client/Server Separation:** Lógica de animaciones e interactividad (GSAP) aislada en componentes cliente específicos.
- **Type Safety:** Refactorización completa para eliminar tipos `any` y asegurar un tipado estricto en animaciones complejas.

## 🛠️ Tecnologías Principales

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **UI & Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones:** [GSAP](https://gsap.com/) (Centralizado en `gsapHelpers`)
- **Iconos:** [Lucide React](https://lucide.dev/)

## 📂 Características Destacadas

- **Interfaz Switch OS:** Navegación, barra de control y layout basados en el sistema de Nintendo Switch.
- **Navegación Fluida:** Transiciones y animaciones gestionadas mediante GSAP para emular la naturalidad de una consola.
- **Vistas Específicas:** Secciones de `proyectos`, `habilidades` y `contacto`, junto con detalles interactivos simulando la eShop y la UI del sistema.
- **Diseño Responsive:** Adaptado para mantener la inmersión sin importar el tamaño de la pantalla.

## 🛠️ Instalación y Uso

Este proyecto utiliza `pnpm` como gestor de paquetes (recomendado para eficiencia de espacio).

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

## 📝 Notas de Desarrollo

Este proyecto no es solo una pieza visual, sino una demostración de buenas prácticas en **Arquitectura Frontend**, **Maquetación Avanzada** y **Animaciones de Alto Rendimiento**.

---

_Desarrollado con pasión por [Joaquin Castro](https://github.com/Joakamakaka1)._
