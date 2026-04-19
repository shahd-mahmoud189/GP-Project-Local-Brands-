export default function WishlistCard() {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-[#F0EBE5] flex flex-col hover:-translate-y-1 transition-transform duration-300">
      
      {/* Image */}
      <div className="relative bg-[#F5F1EB] flex items-center justify-center p-6 aspect-square">
        <img
          src="https://placehold.co/400x400/F5F1EB/864227"
          alt="product"
          className="w-28 h-28 object-cover rounded-xl"
        />
        <button className="absolute top-3 right-3 w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#864227" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#864227] opacity-65">
          Brand Name
        </span>
        <h2 className="text-[13px] font-semibold text-black mt-1 mb-2 leading-snug flex-1 line-clamp-2">
          Product Title
        </h2>
        <p className="text-[17px] font-bold text-[#864227] mb-4">
          0 EGP
        </p>
        <button className="w-full bg-[#864227] hover:bg-[#6e3420] active:scale-95 text-[14px]  text-white rounded-full py-4 text-[9px] font-bold  transition-all duration-200">
          Add To Cart
        </button>
      </div>

    </article>
  );
}