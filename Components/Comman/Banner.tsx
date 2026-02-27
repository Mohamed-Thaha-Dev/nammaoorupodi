"use client";

import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
  <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden isolate">

  {/* Background */}
  <div className="absolute inset-0 -z-20">
    <Image
      src="/bg/banner-bg.webp"
      alt="Banner Background"
      fill
      className="object-cover"
    />
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/70 -z-10"></div>

  {/* Content */}
  <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
    <h2 className="text-4xl md:text-5xl font-semibold mb-6 [font-family:var(--font-heading)]">
      Ready to Go Natural?
    </h2>

    <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
      Submit your custom request today and get freshly prepared kirai powder
      delivered to your doorstep.
    </p>
<Link href="/order">
    <button className="bg-white text-green-700 cursor-pointer font-medium px-8 py-4 rounded-xl shadow-lg hover:scale-105 hover:bg-green-50 transition duration-300">
      Submit a Request →
    </button>
    </Link>
  </div>
</section>
  );
};

export default Banner;




// export default function Banner() {
//     return (
//         <>
           
//             <section className="flex flex-col items-center justify-center mx-auto max-md:mx-2 max-md:px-2  w-full text-center py-20 md:py-24 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/banners/image-2.png')] bg-cover bg-center bg-no-repeat">
//                 <h1 className="text-2xl md:text-3xl font-medium text-white max-w-2xl">Ready to Go Natural?</h1>
//                 <div className="h-[3px] w-32 my-1 bg-gradient-to-l from-transparent to-white"></div>
//                 <p className="text-sm md:text-base text-white max-w-xl">
//                       Submit your custom request today and get freshly prepared kirai powder
//       delivered to your doorstep.
//       </p>
//                 <button className="px-10 py-3 mt-4 text-sm bg-white hover:scale-105 transition duration-300 rounded-full">
//                      Submit a Request →
//                 </button>
//             </section>
//         </>
//     );
// };