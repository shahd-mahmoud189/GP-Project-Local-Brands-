export default function ShippingDetails() {
  return (
    <div className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 ml-1 ">First Name</label>
          <input type="text" placeholder="Mary" className="w-full rounded-xl bg-white border border-gray-200 p-4  focus:ring-2 focus:ring-[#864227]/150 outline-none transition-all" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 ml-1 focus:ring-2 focus:ring-[#864227] outline-none">Last Name</label>
          <input type="text" placeholder="John" className="w-full rounded-xl bg-white border border-gray-200 p-4  focus:ring-2 focus:ring-[#864227] outline-none  transition-all" />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 ml-1 focus:ring-2 focus:ring-[#864227] outline-none">Shipping Address</label>
        <input type="text" placeholder="123 Main St, Building, Apt" className="w-full rounded-xl bg-white border border-gray-200 p-4  focus:ring-2 focus:ring-[#864227] outline-none  transition-all" />
      </div>
    
    </div>
  );
}