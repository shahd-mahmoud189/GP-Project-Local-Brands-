import Link from 'next/link'
import React from 'react'

export default function ({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
    <nav className='flex gap-5 '>
      <div className='*:block bg-slate-300'>
      <Link href={'dashboard'}>Dashboard</Link>
      <Link href={'orders'}>orders</Link>
      <Link href={'savedItems'}>savedItems</Link>
      <Link href={'shippingAddress'}>shippingAddress</Link>
    </div>
     {children}
    </nav>
   
    </>
  )
}
