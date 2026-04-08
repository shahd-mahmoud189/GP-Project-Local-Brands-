import React from "react";

export default function ShippingDetails() {
  return (
    <div className="mb-5 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm text-[#54433D] mb-1 ml-2 font-light">
            First Name
          </label>
          <input
            type="text"
            placeholder="Mary"
            className="w-full rounded-4xl bg-[#E5E2DD] border p-4 focus:outline-none focus:ring-2 focus:ring-[#A86A52]"
          />
        </div>

        <div>
          <label className="block text-sm text-[#54433D] mb-1 ml-2 font-light">
            Last Name
          </label>
          <input
            type="text"
            placeholder="John"
            className="w-full rounded-4xl bg-[#E5E2DD] border p-4 focus:outline-none focus:ring-2 focus:ring-[#A86A52]"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-[#54433D] mb-1 ml-2 font-light">
          Address
        </label>
        <input
          type="text"
          placeholder="123 Main St, Building, Apt"
          className="w-full rounded-4xl bg-[#E5E2DD] border p-4 focus:outline-none focus:ring-2 focus:ring-[#A86A52]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#54433D] mb-1 ml-2 font-light">
            City
          </label>
          <input
            type="text"
            placeholder="Cairo"
            className="w-full rounded-4xl bg-[#E5E2DD] border p-4 focus:outline-none focus:ring-2 focus:ring-[#A86A52]"
          />
        </div>
        <div>
          <label className="block text-sm text-[#54433D] mb-1 ml-2 font-light">
            Postal Code
          </label>
          <input
            type="text"
            placeholder="12345"
            className="w-full rounded-4xl bg-[#E5E2DD] border p-4 focus:outline-none focus:ring-2 focus:ring-[#A86A52]"
          />
        </div>
      </div>
    </div>
  );
}
