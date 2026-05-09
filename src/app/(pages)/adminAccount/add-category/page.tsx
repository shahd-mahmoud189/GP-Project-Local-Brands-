import CategoryListClient from '@/app/_components/CategoryListClient/CategoryListClient';
import { getAllCategory } from '@/app/api/serverFunction/serverFunctions.api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['allCategories'],
    queryFn: getAllCategory,
  });

  return (
    <div className='container mx-auto md:px-12 py-10'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryListClient />
      </HydrationBoundary>
    </div>
  );
}