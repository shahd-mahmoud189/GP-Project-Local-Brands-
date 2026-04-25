import BrandRequestForm from '@/app/_components/forms/BrandRequestForm/BrandRequestForm'
import React from 'react'

export default function page() {
  return (
    <div className='container mx-auto px-12 py-10 flex items-center justify-center flex-col md:w-1/2'>
       <div className="mb-6">
        <h2 className="font-bold text-4xl">Brand Request</h2>
        <p className="text-[#796C63] mt-4 font-semibold">Join Brandy marketplace by registering your brand. Fill out the form below and we'll review your application.</p>
      </div>
      <BrandRequestForm/>
    </div>
  )
}
