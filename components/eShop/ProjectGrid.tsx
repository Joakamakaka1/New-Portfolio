import FeaturedCard from "./FeaturedCard";

// Mock data
const mockProjects = [
  {
    id: "1",
    title: "The Legend of Zelda: Breath of the Wild - Clon",
    desc: "Un clon interactivo del menú del juego creado con React y Tailwind. Explora la interfaz icónica reimaginada en web.",
    imgUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Super Mario Odyssey CSS",
    desc: "Animaciones CSS puro",
    imgUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Animal Crossing Todo",
    desc: "Gestor de tareas diario",
    imgUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Metroid Prime UI",
    desc: "Interfaz estilo HUD",
    imgUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function ProjectGrid() {
  return (
    <div className="w-full h-auto pb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 mt-2">
        {mockProjects.map((project) => {
          const pFixed = {
            id: parseInt(project.id),
            title: project.title,
            desc: project.desc,
            imgUrl: project.imgUrl,
          };
          return <FeaturedCard key={project.id} project={pFixed} />;
        })}
      </div>
    </div>
  );
}
