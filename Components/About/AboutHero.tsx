"use client";

import { useEffect, useRef } from "react";

import { ArrowRight} from "lucide-react";
import { gsap } from "gsap";

import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

useEffect(() => {
  const ctx = gsap.context(() => {
    elementsRef.current.forEach((el) => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      });
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section className="py-12 px-4 bg-[#f9f9f9]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-center items-center mb-10">
          <div
            ref={addToRefs}
            className="relative w-full rounded-lg overflow-hidden border-none"
          >
            {/* Image */}
            <Image
              width={400}
              height={400}
              src="/bg/hero-bg.webp"
              alt="Namma Ooru Podi"
              className="w-full h-[450px] object-cover "
            />
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Top Left Card */}
            <div className="absolute left-0 top-0 bg-white p-6 rounded-br-2xl z-10">
              <h3 className="text-3xl font-bold text-green-600">100%</h3>
              <p className="text-gray-600 text-sm">Natural Ingredients</p>
            </div>

            {/* Bottom Right Card */}
            <div className="absolute right-0 bottom-0 bg-white p-6 rounded-tl-2xl z-10">
              <h3 className="text-3xl font-bold text-green-600">0%</h3>
              <p className="text-gray-600 text-sm">No preservatives. No chemicals.</p>
            </div>
          </div>

          {/* <div ref={addToRefs} className="flex gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-lg" />
            <div className="w-8 h-8 bg-gray-200 rounded-lg" />
            <div className="w-8 h-8 bg-gray-200 rounded-lg" />
          </div> */}
        </div>

        {/* Stats */}
        <div ref={addToRefs} className="flex justify-between mb-12 text-sm">
          <div>
            <span className="text-green-600 font-bold">1+</span> Years of
            Tradition
          </div>
          <div>
            <span className="text-green-600 font-bold">100%</span> Natural
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Left Content */}
          <div className="md:col-span-2">
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 [font-family:var(--font-heading)]">
              Bringing Back Traditional Village Nutrition.
            </h2>

            <div
              ref={addToRefs}
              className="grid md:grid-cols-2 gap-8 text-gray-600"
            >
              <p className=" font-normal">
                Namma Ooru Podi started with a simple goal — deliver authentic
                keerai powder made using traditional sun-drying techniques.
              </p>

              <p className=" font-normal" >
                We carefully handpick leaves and prepare them without
                preservatives to ensure purity and natural goodness in every
                spoon.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="text-right space-y-6">
            <div ref={addToRefs} className="text-green-600 text-2xl font-bold">
              NAMMA OORU PODI
            </div>

            <div ref={addToRefs} className="text-gray-600 text-sm">
              Homemade | Traditional | Pure
            </div>

            <div ref={addToRefs}>
              <p className="text-gray-900 font-medium">
                Ready to experience authentic village nutrition?
              </p>
            </div>

            <div ref={addToRefs}>
              <Link href="/product">
              <button className="bg-neutral-900 hover:bg-neutral-950 transition-all duration-300 text-white px-5 py-3 rounded-lg font-semibold flex gap-2 ml-auto cursor-pointer">
                EXPLORE PRODUCTS <ArrowRight />
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
