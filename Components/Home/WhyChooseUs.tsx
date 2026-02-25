"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: "100% Natural Ingredients",
    desc: "We use only naturally grown greens without chemicals.",
    icon: "🌱",
  },
  {
    id: 2,
    title: "Traditional Preparation",
    desc: "Prepared using authentic sun-drying methods.",
    icon: "🏡",
  },
  {
    id: 3,
    title: "Rich in Nutrients",
    desc: "Packed with essential vitamins for daily wellness.",
    icon: "💚",
  },
  {
    id: 4,
    title: "Hygienic Processing",
    desc: "Handled and packed with care and purity.",
    icon: "✨",
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.to(bgRef.current, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-black"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <Image
          src="/bg/hero-bg.webp"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative max-w-7xl mx-auto px-6 text-white">
        {/* Section Title */}
        <div className="text-center mb-16 text-white">
          <h2 className="text-4xl md:text-5xl font-black [font-family:var(--font-heading)]">Why Choose Us</h2>
          <p className="mt-4 text-lg text-green-100">
            We bring purity, tradition, and nutrition to every home.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white/10 backdrop-blur-md rounded-3xl shadow-lg p-8 text-center transition duration-500 hover:-translate-y-3 hover:shadow-2xl border border-white/20 text-white"
            >
              <div className="text-5xl mb-5">{feature.icon}</div>

              <h3 className="text-xl font-semibold mb-3 ">{feature.title}</h3>

              <p className="text-sm leading-relaxed text-green-100">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
