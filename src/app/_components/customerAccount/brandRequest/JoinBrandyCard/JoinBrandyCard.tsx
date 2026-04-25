import Link from 'next/link'
import React from 'react'

export default function JoinBrandyCard() {
  return (
        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
      <div className="flex gap-6 items-center">
        <div className="w-40 h-40 bg-orange-50 rounded-xl flex items-center justify-center">
          <span className="text-orange-600 font-bold">BRAND</span>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Start selling with Brandy</h2>
          <p className="text-gray-500 mt-1 max-w-md">
            Create your brand profile, add your products, and grow your business with us.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <i className='fa-solid fa-users'></i> Reach more customers
            </li>
            <li className="flex items-center gap-2">
               <i className="fa-brands fa-whmcs"></i> Manage your own products
            </li>
            <li className="flex items-center gap-2">
               <i className="fa-solid fa-chart-gantt"></i>Track your sales and performance
            </li>
          </ul>

          <Link href={'/request-brand'} className="mt-4 bg-[#864227] text-white px-4 py-2 rounded-xl hover:bg-orange-800">
            Apply as a Brand
          </Link>
        </div>
      </div>
    </div>
  )
}
