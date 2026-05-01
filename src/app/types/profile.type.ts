export type UserProfile = {
  profileId: number;
  userId: number;
  fullName: string;
  email: string;
  profileImage: string | null;
  address: string | null;
  bio: string | null;
  userType: "Customer" | "BrandOwner" | 'Admin' |string; 
  updatedAt: string; 
}