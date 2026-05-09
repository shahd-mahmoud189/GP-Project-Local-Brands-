import Link from 'next/link';
import { Settings } from 'lucide-react';
import { getImageUrl } from '@/app/utils/imageUrl';
import { Package } from 'lucide-react';
import { getMyBrands } from '@/app/api/serverFunction/serverFunctions.api';
import { EditBrandButton } from '@/app/_components/EditBrandButton/EditBrandButton';

export default async function MyBrandPage() {
  const brands = await getMyBrands();
  const brand = brands[0];

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-lg border border-stone-200 p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-8 items-start">
            {/* Logo */}
            <div className="sm:col-span-1">
              <div className="w-full aspect-square bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                <img
                  src={'/Logo.png'}
                  alt={brand.brandName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="sm:col-span-3 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
                    {brand.brandName}
                  </h1>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      {brand.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
                <EditBrandButton
                  brandId={brand.brandId}
                  initialName={brand.brandName}
                  initialDescription={brand.description}
                />
              </div>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {brand.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200">
                <div>
                  <p className="text-stone-600 text-xs sm:text-sm mb-1">Owner</p>
                  <p className="font-semibold text-stone-900 text-sm">{brand.ownerName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}