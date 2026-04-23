import AddressCard from "@/app/_components/cards/AddressCard/AddressCard";
import React from "react";

export default function page() {
  return (
    <div className="p-8">
      <div className="mb-10">
        <h2 className="text-4xl font-bold">Shipping Addresses</h2>
        <p className="text-[#6B5B54] text-sm font-medium mt-2">
          Manage your delivery locations for faster checkout.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
          <AddressCard isDefault={true}/>
        
          <AddressCard isDefault={false}/>
        
          <div className="flex flex-col items-center justify-center uppercase text-sm border-2 border-dashed rounded-2xl p-6 text-[#6b5b54] border-[#EEEEEE] hover:border-[#bc5439] hover:text-[#bc5439] transition">
            <i className="fa-solid fa-location-dot mb-2 text-lg"></i>
            Add new address
          </div>
      </div>
    </div>
  );
}
