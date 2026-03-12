import HomeContent from "@/components/features/home/HomeContent";

// Simulación de fetching en servidor (futuro CMS)
async function getNews() {
  return [
    {
      id: 1,
      title: "Actualización de Portfolio #1",
      date: "Hace 2 días",
      image: "/Foto1.png",
    },
    {
      id: 2,
      title: "Actualización de Portfolio #2",
      date: "Hace 2 días",
      image: "/Foto1.png",
    },
    {
      id: 3,
      title: "Actualización de Portfolio #3",
      date: "Hace 2 días",
      image: "/Foto1.png",
    },
  ];
}

export default async function Descubrir() {
  const news = await getNews();
  return <HomeContent news={news} />;
}
