import FeatureSection from "@/Components/Comman/FeatureSection";
import SubHero from "@/Components/Comman/SubHero";
import CustomRequest from "@/Components/Order/CustomRequest";

export default function OrderPage(){
    return(
        <>
      
        <SubHero title=" Custom Request" subtitle=" Fill in your details and we'll get back to you with pricing and
            availability." tag="ORDER" bg="#f8f7f2"/>
            <CustomRequest/>
            <FeatureSection/>
              </>
    )
}