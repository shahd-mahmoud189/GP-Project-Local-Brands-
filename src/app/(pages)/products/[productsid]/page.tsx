import ReviewCard from "@/app/_components/cards/ReviewCard/ReviewCard";
import ProductInteractive from "@/app/_components/ProductInteractive/ProductInteractive";
import { getProductById } from "@/app/api/serverFunction/serverFunctions.api";
import Image from "next/image";
import Link from "next/link";

export default async function page({ params }: { params: Promise<{ productsid: string }> }) {
  const { productsid } = await params;
  const product = await getProductById(productsid);

  if (!product) return <div className="container mx-auto px-12 py-10">Product not found.</div>;

  return (
    <div className="container mx-auto px-12 py-10">
      <div className="lg:flex lg:justify-center lg:gap-10 space-y-4 mb-12">

        {/* صورة المنتج */}
        <div className="lg:w-2/6">
          <div className="relative aspect-4/5 rounded-4xl overflow-hidden bg-stone-100">
            <Image
              src={product.imageUrls}
              alt={product.productName}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* التفاصيل */}
        <div className="lg:w-1/3 p-4 space-y-5">
          <div>
            <Link
              href={`/brands/${product.brandId}`}
              className="text-sm font-light text-[#864227] block mb-2 hover:underline"
            >
              {product.brandName}
            </Link>
            <h1 className="text-5xl">{product.productName}</h1>
            <p className="text-lg font-light text-[#54433D] mt-4">{product.description}</p>
          </div>

          {/* الجزء التفاعلي */}
          <ProductInteractive
            basePrice={product.basePrice}
            variants={product.variants || []}
            allowsCustomization={product.allowsCustomization}
            customizationOptions={product.customizationOptions}
          />
        </div>
      </div>

      {/* Reviews */}
      <div className="lg:grid lg:grid-cols-4 lg:gap-16 mb-12 px-10">
        <div className="lg:col-span-1 p-8">
          <h4 className="italic text-[27px] mb-8">Customer Stories</h4>
          <p className="text-7xl font-bold mb-4">
            {product.averageRating > 0 ? product.averageRating : "—"}
          </p>
          <span className="text-[#BC5439] mb-4 text-lg">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fa-${i < Math.round(product.averageRating) ? "solid" : "regular"} fa-star`} />
            ))}
          </span>
          <p className="uppercase text-[10px] tracking-widest text-[#54433D] opacity-55">
            Based on {product.reviewCount} reviews
          </p>
        </div>
        <div className="lg:col-span-3 p-8">
          <ReviewCard />
        </div>
      </div>

      {/* You Might Also Like */}
      <div className="flex justify-between items-center mb-10 px-10">
        <h4 className="text-3xl italic">You Might Also Like</h4>
        <Link href="/products" className="tracking-widest text-xs">
          Explore All <i className="fa-solid fa-arrow-right" />
        </Link>
      </div>
    </div>
  );
}