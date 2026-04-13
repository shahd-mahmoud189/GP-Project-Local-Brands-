import CategoryCard from "../../cards/CategoryCard/CategoryCard";
export default function ExploreCategories() {
  // داتا الأقسام عشان الكود يبقى منظم
  const categories = [
    { title: "Handmade", count: "120", image: "/unnamed.png" },
    { title: "Fashion", count: "85", image: "/fashion-img.png" },
    { title: "Accessories", count: "210", image: "/acc-img.png" },
    { title: "Home Decor", count: "45", image: "/home-img.png" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">

        {/* Header السيكشن */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-serif text-[#2D3A30]">
              Explore Our <span className="italic text-[#864227]">Categories</span>
            </h2>
            <div className="h-0.5 w-16 bg-[#BC5439]" />
          </div>

          <button className="text-sm font-bold tracking-widest uppercase text-[#864227] hover:opacity-70 transition-opacity">
            View All
          </button>
        </div>

        {/* Grid توزيع الكروت */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <CategoryCard
              key={index}
              title={cat.title}
              count={`${cat.count} ITEMS`}
              image={cat.image}
            />
          ))}
        </div>

      </div>
    </section>
  );
}