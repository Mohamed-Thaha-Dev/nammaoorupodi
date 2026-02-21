import AboutUs from "@/Components/Home/Aboutus";
import HeroScrollVideo from "@/Components/Home/HomeSection";
import ProductSection from "./ProductSection";
import WhyChooseUs from "./WhyChooseUs";
import Banner from "./Banner";


export default function HomePage(){
  return(
    <>
     <HeroScrollVideo
        title="Traditional Kirai Powders for Healthy Living"
        subtitle="Cook tasty idly, dosa & meals with our natural kirai powders — made the traditional way."
        media="/video/hero-vid1.mp4"
        overlay={{
          caption: "NAMMA OORU PODI",
          heading: "Healthy Living",
          paragraphs: ["Natural fiber content aids smooth digestion and gut health."],
        }}
        button="Order Now"
        // Force dark theme with custom palette
        // themeMode="system"
      />
      <AboutUs/> 
      <ProductSection/>
      <WhyChooseUs/>
      <Banner/>
    </>
  )
    
}