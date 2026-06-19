"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/app/api/search.api";
import { getSingleCategory } from "@/app/api/category.api";
import { getSingleBrand } from "@/app/api/brand.api";
import { SearchResponse } from "@/app/types/search.type";
import ProductCard from "../../_components/cards/ProductCard/ProductCard";
import BrandCard from "../../_components/cards/BrandCard/BrandCard";
import CategoryCard from "../../_components/cards/CategoryCard/CategoryCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (query) {
      const getResults = async () => {
        setLoading(true);
        setError(false);
        try {
          let data = await searchProducts(query);

          let additionalProducts: any[] = [];

          if (data.categories && data.categories.length > 0) {
            const categoriesDetails = await Promise.all(
              data.categories.map((cat: any) => getSingleCategory(cat.categoryId.toString()).catch(() => null))
            );
            const validCategories = categoriesDetails.filter(c => c !== null);
            data.categories = validCategories;
            validCategories.forEach(cat => {
              if (cat && cat.products) additionalProducts.push(...cat.products);
            });
          }

          if (data.brands && data.brands.length > 0) {
            const brandsDetails = await Promise.all(
              data.brands.map((brand: any) => getSingleBrand(brand.brandId.toString()).catch(() => null))
            );
            const validBrands = brandsDetails.filter(b => b !== null);
            // Replace the minimal brand payload with the complete payload
            data.brands = validBrands;
            validBrands.forEach(brand => {
              if (brand && brand.products) additionalProducts.push(...brand.products);
            });
          }

          if (additionalProducts.length > 0) {
            const existingIds = new Set((data.products || []).map((p: any) => p.productId));
            for (const p of additionalProducts) {
              if (!existingIds.has(p.productId)) {
                data.products.push(p);
                existingIds.add(p.productId);
              }
            }
          }

          setResults(data);
        } catch (err) {
          console.error("Search Page Error:", err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      getResults();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="container mx-auto p-20 text-center">
        <div className="animate-spin size-10 border-4 border-[#0288D1] border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Searching for items...</p>
      </div>
    );
  }


  if (error) {
    return <div className="p-20 text-center text-red-500">Something went wrong. Please try again.</div>;
  }


  const isEmpty = results &&
    results.products.length === 0 &&
    results.brands.length === 0 &&
    results.categories.length === 0;

  return (
    <div className="container mx-auto px-6 lg:px-12 py-10 min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-slate-800">
        Search Results for: <span className="text-[#0288D1]">"{query}"</span>
      </h1>

      {isEmpty ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-gray-500 text-lg">No results found. Try searching for something else!</p>
        </div>
      ) : (
        <div className="space-y-16">

          {/* 1. Products Section */}
          {results?.products && results.products.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-slate-800">Products</h2>
                <span className="bg-[#0288D1]/10 text-[#0288D1] px-2 py-0.5 rounded text-sm">
                  {results.products.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.products.map((item) => (
                  <ProductCard key={item.productId} product={item} />
                ))}
              </div>
            </section>
          )}

          {/* 2. Categories Section */}
          {results?.categories && results.categories.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-6 text-slate-800">Categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {results.categories.map((cat) => (
                  <CategoryCard key={cat.categoryId} category={cat} />
                ))}
              </div>
            </section>
          )}

          {/* 3. Brands Section */}
          {results?.brands && results.brands.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-6 text-slate-800">Brands</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {results.brands.map((brand) => (
                  <BrandCard key={brand.brandId} brand={brand} />
                ))}
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  );
}