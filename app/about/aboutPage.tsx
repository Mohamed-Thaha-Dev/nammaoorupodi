import AboutHeroSection from "@/Components/About/AboutHero";
import FeatureSection from "@/Components/Comman/FeatureSection";
import Stats from "@/Components/Comman/Stats";
import SubHero from "@/Components/Comman/SubHero";
import OurProcess from "../../Components/About/OurProcess";
import OurMission from "@/Components/About/OurMission";


export default function AboutPage(){
  return(
    <>
    <SubHero title="About Us" subtitle="From Our Village Kitchen to Your Family Table" bg="#f9f9f9" tag="Our Story"/>
    <AboutHeroSection/>
    <Stats/>
    {/* <FeatureSection/> */}
    <OurProcess/>
    <OurMission/>
    </>
  )
}