import LoginForm from '@/app/_components/forms/LoginForm/LoginForm'
import React from 'react'

export default function page() {
  return (
    <div className="flex items-center justify-center">
        <div className="rounded-xl shadow-xl p-10 m-12 w-100">
          <h4 className="text-center text-xl font-semibold text-slate-700 mb-6">
              <i className="fa-solid fa-arrow-right-to-bracket text-[#A2CB8B] mr-2"></i>
            Sign In to Your Account
          </h4>
          <LoginForm/>
        </div>
      </div>
  )
}
