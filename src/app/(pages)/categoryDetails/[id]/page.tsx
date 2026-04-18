import ProductCard from "@/app/_components/cards/ProductCard/ProductCard";

export default function page() {
  return (
    <div className="container mx-auto px-12 py-10">
      <div className="mb-20 px-10">
        <h2 className="text-[#864227] text-4xl ">Handmade</h2>
        <p className="text-[#796C63] mt-4 font-light">
          Dive into our exclusive range of high-quality essentials. Whether
          you're looking <br /> for inspiration or a specific must-have, our
          collection offers the perfect balance of variety and excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-10">

        <div className="col-span-1 space-y-4 mb-8">
          <h4 className="text-xl mb-5">Price Range</h4>
          <div className="flex items-center">
            <input type="radio" name="price" id="low" value="low" className="accent-[#864227] size-4 mr-2 border-red-600"/>
            <label htmlFor="low" className="text-slate-700 font-light">Under 200 EGB</label>
          </div>
          <div className="flex items-center">
            <input type="radio" name="price" id="medium" value="medium" className="accent-[#864227] size-4 mr-2"/>
            <label htmlFor="medium" className="text-slate-700 font-light">500 EGP - 1000 EGP</label>
          </div>
          <div className="flex items-center">
            <input type="radio" name="price" id="high" value="high" className="accent-[#864227] size-4 mr-2"/>
            <label htmlFor="high" className="text-slate-700 font-light">+1000 EGP</label>
          </div>

          <h4 className="text-xl mt-10 mb-5">Brand</h4>
          <div className="flex items-center">
            <input type="checkbox" name="brand" id="brand1" value="brand1" className="accent-[#864227] size-4 mr-2 border-red-600"/>
            <label htmlFor="brand1" className="text-slate-700 font-light">Terra & Co</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="brand" id="brand2" value="brand2" className="accent-[#864227] size-4 mr-2"/>
            <label htmlFor="brand2" className="text-slate-700 font-light">Oak & Embers</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="brand" id="brand3" value="brand3" className="accent-[#864227] size-4 mr-2"/>
            <label htmlFor="brand3" className="text-slate-700 font-light">The Modern Weaver</label>
          </div>

        </div>

        <div className="md:col-span-2 lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            <ProductCard saved={false} showWishlist={true}/>
            <ProductCard saved={false} showWishlist={true}/>
            <ProductCard saved={false} showWishlist={true}/>
            <ProductCard saved={false} showWishlist={true}/>
        </div>

      </div>
    </div>
  );
}
