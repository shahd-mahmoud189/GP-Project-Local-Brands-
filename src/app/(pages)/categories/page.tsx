import CategoryCard from '@/app/_components/cards/CategoryCard/CategoryCard'
import React from 'react'

export default function page() {
  return (
    <div className='container mx-auto px-12 py-10'>
      <div className='mb-6 px-12'>
        <h2 className='text-[#864227] text-4xl '>Discover Our Collections</h2>
        <p className='text-[#796C63] mt-4 font-light'>From daily essentials to premium picks, dive into our <br /> diverse categories and discover a world of quality crafted just for you.</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 p-10'>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
      </div>
    </div>
  )
}
