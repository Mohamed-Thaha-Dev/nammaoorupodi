import AboutUs from "@/Components/Home/Aboutus";
import HeroScrollVideo from "@/Components/Home/HomeSection";
import ProductSection from "./ProductSection";
import WhyChooseUs from "./WhyChooseUs";
import Banner from "../Comman/Banner";


export default function HomePage(){
  return(
    <>
     <HeroScrollVideo
        title="Traditional keerai Powders for Healthy Living"
        subtitle="Cook tasty idly, dosa & meals with our natural keerai powders — made the traditional way."
        media="/video/hero-vid1.mp4"
        overlay={{
          caption: "NAMMA OORU PODI",
          heading: "Healthy Living",
          subheading:"Natural fiber content aids smooth digestion and gut health.",
          paragraphs: ["🌿 Rich in natural fiber for better digestion","💪 Supports immunity and body strength","🩸 Contains iron and essential nutrients","🌱 Made from 100% natural greens","❤️ Promotes overall health and wellness"],
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