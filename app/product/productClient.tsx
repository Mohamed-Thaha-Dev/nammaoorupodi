"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScrollVideo from "@/Components/Home/HomeSection";
import Image from "next/image";
import Banner from "@/Components/Home/Banner";

import SubHero from "@/Components/SubHero";

gsap.registerPlugin(ScrollTrigger);

export default function KiraiProducts() {
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);

  const products = [
    {
      id: 1,
      tag: "DRUMSTICK LEAF POWDER",
      title: "Murungai Kirai Powder",
      desc: "Made from carefully selected Murungai leaves, this nutrient-rich superfood supports immunity, bone strength, and daily energy. Packed with essential vitamins and minerals. 100% natural with no added preservatives or chemicals.",
      nutrients: ["Iron", "Calcium", "Vitamin A", "Protein", "Potassium"],
      image: "/products/powder-1.jpg",
      reverse: false,
      bg: "bg-white",
    },
    {
      id: 2,
      tag: "BALLOON VINE LEAF POWDER",
      title: "Mudakathan Kirai Powder",
      desc: "Traditionally valued for joint and bone health, this herbal powder helps reduce body discomfort and improve flexibility naturally. Rich in essential nutrients. 100% natural with no added preservatives or chemicals.",
      nutrients: [
        "Calcium",
        "Antioxidants",
        "Iron",
        "Fiber",
        "Essential Minerals",
      ],
      image: "/products/powder-2.jpg",
      reverse: true,
      bg: "bg-[#F9F6F1]",
    },
    {
      id: 3,
      tag: "CENTELLA ASIATICA POWDER",
      title: "Vallarai Kirai Powder",
      desc: "Prepared from fresh Vallarai leaves, this herbal powder supports memory, concentration, and overall brain health. Rich in antioxidants and plant nutrients. 100% natural with no added preservatives or chemicals.",
      nutrients: [
        "Iron",
        "Vitamin B",
        "Antioxidants",
        "Calcium",
        "Plant Nutrients",
      ],
      image: "/products/powder-3.jpg",
      reverse: false,
      bg: "bg-white",
    },
  ];

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      if (!section) return;

      const text = section.querySelector(".product-text");
      const image = section.querySelector(".product-img");

      // Text reveal
      gsap.fromTo(
        text,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        },
      );

      // Image parallax
      gsap.fromTo(
        image,
        { y: 120, scale: 0.95 },
        {
          y: 0,
          scale: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            scrub:true
          },
        },
      );

      // Floating leaves animation
      gsap.to(section.querySelector(".leaf-1"), {
        y: -200,
        rotation: 20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(section.querySelector(".leaf-2"), {
        y: -300,
        rotation: -25,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div>
        <SubHero
  tag="OUR COLLECTION"
  title="Our Kirai Powders"
  subtitle="Three traditional leaf powders, carefully prepared to bring nature's best nutrition to your kitchen."
  showHeroExitAnimation={true}
  bg="white"
/>

      {products.map((product, index) => (
        <section
          key={product.id}
          ref={(el) => {
            sectionsRef.current[index] = el;
          }}
          className={`${product.bg} relative overflow-hidden py-20`}
        >
          {/* 🌿 Floating Leaves */}
          <Image
            width={200}
            height={200}
            src="/images/leaf1.webp"
            className="leaf-1 absolute top-30 rotate-90 -left-8 md:w-90 w-80 opacity-10 pointer-events-none"
            alt="leaf"
          />

          <Image
            width={200}
            height={200}
            loading="lazy"
            src="/images/leaf2.webp"
            className="leaf-2 absolute bottom-20  -right-16 w-99 opacity-10 pointer-events-none hidden  md:block"
            alt="leaf"
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div
              className={`flex flex-col gap-16 items-center ${
                product.reverse ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* TEXT */}
              <div className="product-text md:w-1/2">
                <p className="text-green-700 text-sm tracking-widest uppercase mb-3">
                  {product.tag}
                </p>

                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  {product.title}
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.desc}
                </p>

                <div className="flex flex-wrap gap-3">
                  {product.nutrients.map((n) => (
                    <span
                      key={n}
                      className="px-4 py-1.5 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* IMAGE */}
              <div className="md:w-1/2 flex justify-center">
                <Image
                width={300}
                height={300}
                  src={product.image}
                  alt={product.title}
                  className="product-img w-[500px] rounded-3xl shadow-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      ))}
      <Banner/>
    </div>
  );
}
