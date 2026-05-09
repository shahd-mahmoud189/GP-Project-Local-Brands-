import { getSingleCategory } from "@/app/api/category.api";
import { getAllBrands } from "@/app/api/brand.api";
import { SingleCategoryResponse } from "@/app/types/category.type";
import { BrandList } from "@/app/types/brand.type";
import ProductsClient from "@/app/_components/ProductsClient/ProductsClient";

export default async function page({ params }: any) {
  const { id } = await params;

  const response: SingleCategoryResponse = await getSingleCategory(id);
  const brands: BrandList = await getAllBrands();

  return (
    <div className="container mx-auto px-4 md:px-12 py-10">
      <div className="mb-16 md:px-10">
        <h2 className="text-slate-700 text-4xl capitalize">
          {response.categoryName}
        </h2>
        <p className="text-slate-600 mt-4 font-light max-w-2xl">
          Dive into our exclusive range of high-quality essentials. Whether
          you're looking for inspiration or a specific must-have, our collection
          offers the perfect balance of variety and excellence.
        </p>
      </div>

      <ProductsClient
        products={response.products || []}
        brands={brands}
        categoryName={response.categoryName}
      />
    </div>
  );
}