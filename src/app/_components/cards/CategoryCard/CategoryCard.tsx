import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  count: string;
  image: string;
}

export default function CategoryCard({ title, count, image }: CategoryCardProps) {
  return (
    <Link href={'/categoryDetails'} className="relative group overflow-hidden rounded-2xl">
      <div className="absolute bg-black/20 inset-0 rounded-2xl z-40"></div>
      <Image
        src={image}
        alt={title}
        width={500}
        height={500}
        className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-all duration-300"
      />
      <div className="absolute bottom-0 p-5 text-white z-50">
        <h3 className="text-xl">{title}</h3>
        <p className="text-xs font-extralight">{count}</p>
      </div>
    </Link>
  );
}
