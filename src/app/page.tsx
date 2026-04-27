import BrandSlider from "./_components/Home/BrandSlider/BrandSlider";
import Features from "./_components/Home/Features/Features";
import Hero from "./_components/Home/Hero/Hero";
import Category from "./_components/Home/Category/Category";



export default function Home() {


  return (
    <>
      {/* Hero */}
     <Hero />
      <BrandSlider />
      <Features />
      <Category/>
    </>
  );
}