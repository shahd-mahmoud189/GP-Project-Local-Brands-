import OrderItem from '@/app/_components/cards/OrderItem/OrderItem'
import React from 'react'

export default function page() {
  return (
    <div className='p-8'>
      <div className="mb-10">
        <h2 className="text-4xl font-bold">Order History</h2>
        <p className="text-[#6B5B54] text-sm font-medium mt-2">
          Track and manage your recent artisan acquisitions.
        </p>
      </div>
      <OrderItem status={true}/>
      <OrderItem status={true}/>
      <OrderItem status={true}/>
    </div>
  )
}
