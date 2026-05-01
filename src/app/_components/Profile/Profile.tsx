"use client";
import { useState } from "react";
import { Camera, MapPin, Mail, User } from "lucide-react";
import { UserProfile } from "@/app/types/profile.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileForm, updateProfileSchema } from "@/app/schema/profile.schema";
import { toast } from "react-toastify";
import { updateProfile } from "@/app/api/profile.api";
import { revalidateProfile } from "@/app/api/serverFunction/revalidate";

export default function Profile({ profile }: { profile: UserProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      address: "",
      bio: "",
    },
    resolver: zodResolver(updateProfileSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
   async function handleEditProfile(values: UpdateProfileForm) {
    try {
      const data = await updateProfile(values);
      toast.success("Profile is updated successfully");
        await revalidateProfile();
      console.log(data);
      setIsEditing(false)
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
    console.log(values);
    
  }
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-6 sm:space-y-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
                My Account
              </h1>
              <p className="text-stone-600 text-sm sm:text-base">
                Manage your profile information and account settings
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded-full font-semibold transition text-sm sm:text-base"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
            {/* Profile Header with Image */}
            <div className="bg-linear-to-r from-amber-800 to-amber-900 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-stone-200 rounded-full overflow-hidden border-4 border-white flex items-center justify-center">
                    {profile.profileImage ? (
                      <img
                        src={profile.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={48} className="text-stone-400" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-white text-amber-800 p-2 rounded-full shadow-lg cursor-pointer hover:bg-stone-50 transition">
                      <Camera size={20} />
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  )}
                </div>

                {/* Profile Info */}
                <div className="text-white flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                    {profile.fullName}
                  </h2>
                  <div className="space-y-2 text-amber-100">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      <span className="text-sm sm:text-base">
                        {profile.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span className="text-sm sm:text-base">
                        {profile.userType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 sm:p-8">
              {!isEditing ? (
                // View Mode
                <div className="space-y-6">
                  {/* Full Name */}
                  <div className="border-b border-stone-200 pb-6">
                    <label className="text-xs font-semibold text-amber-700 uppercase tracking-wide block mb-2">
                      Full Name
                    </label>
                    <p className="text-lg font-semibold text-stone-900">
                      {profile.fullName || "—"}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="border-b border-stone-200 pb-6">
                    <label className="text-xs font-semibold text-amber-700 uppercase tracking-wide block mb-2">
                      Email Address
                    </label>
                    <p className="text-lg font-semibold text-stone-900">
                      {profile.email}
                    </p>
                  </div>

                  {/* Address */}
                  <div className="border-b border-stone-200 pb-6">
                    <label className="text-xs font-semibold text-amber-700 uppercase tracking-wide block mb-2">
                      Address
                    </label>
                    <p className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                      <MapPin size={20} className="text-amber-800" />
                      {profile.address || "—"}
                    </p>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="text-xs font-semibold text-amber-700 uppercase tracking-wide block mb-2">
                      Bio
                    </label>
                    <p className="text-base text-stone-600 leading-relaxed">
                      {profile.bio || "—"}
                    </p>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <form className="space-y-6" onSubmit={handleSubmit(handleEditProfile)}>
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="text-sm font-semibold text-stone-900 block mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition text-stone-900"
                      placeholder="Enter your full name"
                      {...register("fullName")}
                    />
                    {formState.errors.fullName && (
                      <>
                        <p className="text-red-500 text-sm font-medium">
                          {formState.errors.fullName.message}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Email (Read-only) */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-stone-900 block mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      disabled
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg bg-stone-100 text-stone-600 cursor-not-allowed"
                    />
                    <p className="text-xs text-stone-500 mt-2">
                      Email cannot be changed
                    </p>
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="text-sm font-semibold text-stone-900 block mb-2"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition text-stone-900"
                      placeholder="Enter your address"
                      {...register("address")}
                    />
                    {formState.errors.address && (
                      <>
                        <p className="text-red-500 text-sm font-medium">
                          {formState.errors.address.message}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label
                      htmlFor="bio"
                      className="text-sm font-semibold text-stone-900 block mb-2"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition text-stone-900 resize-none"
                      placeholder="Tell us about yourself"
                      rows={4}
                      {...register("bio")}
                    />
                    {formState.errors.bio && (
                      <>
                        <p className="text-red-500 text-sm font-medium">
                          {formState.errors.bio.message}
                        </p>
                      </>
                    )}
                    <p className="text-xs text-stone-500 mt-2">
                      /500 characters
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-200">
                    <button
                      // onClick={() => setIsEditing(false)}
                      className="flex-1 bg-amber-800 hover:bg-amber-900 text-white px-6 py-3 rounded-full font-semibold transition text-sm sm:text-base"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                      }}
                      className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-900 px-6 py-3 rounded-full font-semibold transition text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Account Settings Section */}
          <div className="bg-white rounded-lg border border-stone-200 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-stone-900 mb-6">
              Account Settings
            </h3>
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-stone-200 rounded-lg hover:bg-stone-50 transition">
                <div className="font-semibold text-stone-900">
                  Change Password
                </div>
                <div className="text-sm text-stone-600">
                  Update your password
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
