import Image from "next/image";
import Link from "next/link";


export default function ProductCard({ id, name, price, imageUrl, saved, showWishlist }: {
  id?: string,
  name?: string,
  price?: number,
  imageUrl?: string,
  saved: boolean,
  showWishlist: boolean
}) {
  return (
    <div className="group relative bg-white rounded-3xl p-3 border-2 border-gray-200 transition-all duration-500 hover:shadow-md hover:-translate-y-1">


      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F9F8F7]">

        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          {showWishlist && (
            <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#864227] hover:bg-[#864227] hover:text-white transition-all">

              <i className={`${saved ? 'fa-solid' : 'fa-regular'} fa-heart text-sm`}></i>
            </button>
          )}


          <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-[#864227] hover:bg-[#864227] hover:text-white transition-all">
            <i className="fa-solid fa-arrow-right-arrow-left text-sm"></i>
          </button>
        </div>

        <Link href={`/products/${id || ""}`} className="block w-full h-full">
          <Image
            src={imageUrl || "/unnamed (1).png"}
            alt={name || "Product Image"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      </div>


      <div className="pt-4 pb-1 px-1 flex flex-col">
        <Link
          href={"/brandDetails"}
          className="text-sm font-semibold text-[#864227] block mb-2"
        >
          Brand Name
        </Link>

        <Link href={`/products/${id || ""}`}>

          <h3 className="text-lg text-slate-800 font-medium line-clamp-1 group-hover:text-[#864227] transition-colors leading-tight">
            {name || "Oatmeal Ribbed Ceramic Vase"}
          </h3>
        </Link>

        <div className="flex items-end justify-between mt-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-medium">Price</span>
            <span className="text-xl font-bold text-slate-900 leading-none">
              {price || 100} <small className="text-[10px] font-normal">EGP</small>
            </span>
          </div>

          <button className="h-10 w-10 rounded-full bg-[#864227] text-white flex items-center justify-center hover:bg-[#6d351f] transition-all shadow-lg active:scale-90">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}