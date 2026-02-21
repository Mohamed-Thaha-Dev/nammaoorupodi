"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {

      // Image reveal
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Stats card reveal
      gsap.from(statsRef.current, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        },
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Content reveal
      gsap.from(contentRef.current?.children || [], {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();

  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#f7f5f2] px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* Top Image Container */}
        <div
          ref={imageRef}
          className="relative rounded-[40px] overflow-hidden"
        >
          <Image
            src="/bg/hero-bg.webp"
            alt="Namma Ooru Podi"
            width={1400}
            height={600}
            className="w-full h-[450px] object-cover"
          />

          {/* Floating Stats Card */}
          <div
            ref={statsRef}
            className="absolute right-6 bottom-6 bg-white rounded-3xl p-8 shadow-2xl w-[260px]"
          >
            <h3 className="text-4xl font-bold text-green-600">
              100%
            </h3>
            <p className="text-gray-700 mt-2">
              Natural Ingredients
            </p>

            <p className="text-sm text-gray-500 mt-4">
              No preservatives. No chemicals.
            </p>
          </div>
        </div>

        {/* Bottom Content */}
        <div
          ref={contentRef}
          className="mt-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Crafting Nutrition
            <br />
            From Our Village Roots.
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
            Namma Ooru Podi brings authentic homemade keerai powder
            prepared using traditional sun-drying techniques and
            time-tested village recipes. We believe in purity,
            simplicity, and nutrition.
          </p>
        </div>

      </div>
    </section>
  );
}