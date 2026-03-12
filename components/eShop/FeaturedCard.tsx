import Image from "next/image";

type Project = {
  id: number;
  title: string;
  desc: string;
  imgUrl: string;
};

export default function FeaturedCard({ project }: { project: Project }) {
  return (
    <div className="relative w-full aspect-square cursor-pointer group shadow-sm bg-gray-200 rounded-xl flex flex-col items-center justify-center transition-transform duration-200 z-10">
      {/* Main Image Container */}
      <div className="w-full h-full relative rounded-xl overflow-hidden border-2 border-transparent transition-colors duration-200 z-10">
        <Image
          src={project.imgUrl}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
