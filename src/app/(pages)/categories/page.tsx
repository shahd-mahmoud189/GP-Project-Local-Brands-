import CategoryListClient from '@/app/_components/CategoryListClient/CategoryListClient';
import { getAllCategory } from '@/app/api/category.api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function Page() {
  const queryClient = new QueryClient();

  // بنسخن الداتا على السيرفر
  await queryClient.prefetchQuery({
    queryKey: ['allCategories'],
    queryFn: getAllCategory,
  });

  return (
    <div className='container mx-auto px-12 py-10'>
      {/* الـ HydrationBoundary بيوصل داتا السيرفر بالكلاينت */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryListClient />
      </HydrationBoundary>
    </div>
  );
}