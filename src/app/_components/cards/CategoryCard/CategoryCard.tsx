import img from "@/../../public/unnamed.png";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard() {
  return (
    <Link href={'/categoryDetails'} className="relative group overflow-hidden rounded-2xl">
      <div className="absolute bg-black/20 inset-0 rounded-2xl z-40"></div>
      <Image
        src="/unnamed.png"
        alt=""
        width={500}
        height={500}
        className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-all duration-300"
      />
      <div className="absolute bottom-0 p-5 text-white z-50">
        <h3 className="text-xl">Handmade</h3>
        <p className="text-xs font-extralight">100 ITEMS</p>
      </div>
    </Link>
  );
}
