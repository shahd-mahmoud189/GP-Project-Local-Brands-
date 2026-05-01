import Profile from '@/app/_components/Profile/Profile'
import { getProfile } from '@/app/api/serverFunction/serverFunctions.api';
import React from 'react'

export default async function page() {
  const response = await getProfile();

  if (!response) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-stone-500">Failed to load profile. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <Profile profile={response} />
    </div>
  );
}