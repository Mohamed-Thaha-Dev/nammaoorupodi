"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const AboutUs = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  //   const leafRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const leaf1Ref = useRef<HTMLImageElement | null>(null);
  const leaf2Ref = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    let gsap: any;
    let ScrollTrigger: any;

    (async () => {
      const gsapPkg = await import("gsap");
      gsap = gsapPkg.gsap || gsapPkg.default;

      const ScrollTriggerPkg = await import("gsap/ScrollTrigger");
      ScrollTrigger = ScrollTriggerPkg.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      // 🌿 Background Slow Movement
      gsap.to(bgRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 🌿 Image Medium Depth
      gsap.to(imageRef.current, {
        y: -80,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const leaves = [
        { ref: leaf1Ref, y: -200, rot: 15 },
        { ref: leaf2Ref, y: -250, rot: -20 },
      ];

      // 🌿 Floating Leaf
      leaves.forEach((leaf) => {
        gsap.to(leaf.ref.current, {
          y: leaf.y,
          rotation: leaf.rot,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // ✨ Text Reveal
      // gsap.from(textRef.current, {
      //   y: 100,
      //   opacity: 0,
      //   duration: 1.2,
      //   ease: "power3.out",
      //   scrollTrigger: {
      //     trigger: textRef.current,
      //     start: "top 80%",
      //   },
      // });
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-900 opacity-70"
      />

      {/* Floating Leaf */}
      <Image
        ref={leaf1Ref}
        src="/images/leaf1.webp"
        alt="leaf"
        width={80}
        height={40}
        className="absolute top-10 right-4 -rotate-50 w-80 opacity-40 pointer-events-none hidden md:block"
      />
      <Image
        ref={leaf2Ref}
        src="/images/leaf2.webp"
        alt="leaf"
        width={80}
        height={40}
        className="absolute bottom-0 left-0 w-64 opacity-40 pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        {/* Image */}
        <div ref={imageRef} className="relative">
          <Image
          width={500}
          height={500}
            src="/images/about-img.webp"
            alt="Kirai Preparation"
            className="rounded-3xl shadow-2xl"
          />
        </div>

        {/* Content */}
        <div ref={textRef}>
          <h2 className="text-4xl md:text-5xl font-black text-green-900 mb-6">
            Our Organic Heritage
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We craft our kirai powders using traditional sun-drying and
            stone-grinding methods that preserve nutrients and authenticity.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Every batch reflects purity, sustainability, and our commitment to
            delivering healthy living to every household.
          </p>

          <button className="px-8 py-3 rounded-full bg-green-700 text-white font-semibold hover:scale-105 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};
export default AboutUs;
