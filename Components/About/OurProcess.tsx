"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".process-item");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const steps = [
    "Locally sourced, pesticide-free leaves",
    "Hand-picked and thoroughly washed",
    "Naturally sun-dried to preserve nutrients",
    "Traditional stone grinding methods",
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-[#f9f9f9] px-4">
      <div className="max-w-6xl mx-auto items-start">

        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-semibold mb-6 [font-family:var(--font-heading)]">
            Our Process
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Every batch of our kirai powder is crafted with care using
            traditional methods that preserve nutrients and purity.
            From leaf selection to final grinding, we ensure
            uncompromised quality at every step.
          </p>
        </div>

        {/* Right Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 cursor-pointer mt-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className="process-item hover:bg-[#f9f9f9] bg-white md: p-6 rounded-xl  hover:shadow-lg transition duration-300 group"
            >
              <div className="text-6xl font-bold text-green-600 opacity-20 mb-2 group-hover:opacity-80 transition duration-500">
                0{index + 1}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}