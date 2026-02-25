"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurMission() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(".mission-item");

    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-100 px-4">
      <div className="max-w-4xl mx-auto text-center">

        <h2 className="mission-item text-4xl font-semibold mb-6 [font-family:var(--font-heading)]">
          Our Mission
        </h2>

        <p className="mission-item text-lg text-gray-700 leading-relaxed mb-4">
          We believe that healthy food doesn't need to be complicated or expensive.
        </p>

        <p className="mission-item text-gray-600 leading-relaxed">
          Our mission is to make traditional, nutrient-rich kirai powders
          accessible to every household, so families can enjoy the benefits
          of nature’s superfoods with every meal.
        </p>

        {/* Decorative line */}
        <div className="mission-item w-16 h-1 bg-green-600 mx-auto mt-8 rounded-full"></div>

      </div>
    </section>
  );
}