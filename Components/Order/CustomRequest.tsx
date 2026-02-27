"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import SubHero from "../Comman/SubHero";
import OrderForm from "./OrderForm";

const images = [
  "/products/powder-1.jpg",
  "/products/powder-2.jpg",
  "/products/powder-3.jpg",
];

export default function CustomRequest() {
  const [index, setIndex] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  // Auto image change
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // GSAP animation
  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
    );
  }, [index]);
  useEffect(() => {
    gsap.to(".floating-leaf", {
      y: 20,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="md:py-10 py-5  bg-[#f8f7f2] relative overflow-hidden">
      <Image
        width={100}
        alt="leaf"
        height={100}
        src="/images/leaf1.webp"
        className="floating-leaf absolute top-0 -left-1 rotate-130 w-32 opacity-20  pointer-events-none"
      />

      <Image
        width={100}
        alt="leaf"
        height={100}
        src="/images/leaf2.webp"
        className=" floating-leaf absolute bottom-20 right-0 w-40 opacity-20 rotate-180 hidden md:block pointer-events-none"
      />
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center">
        <div>

        <OrderForm />
        </div>
        <div className="relative w-full h-full overflow-hidden rounded-r-2xl shadow-lg bg-white">
          <Image
            fill
            ref={imageRef}
            key={index}
            src={images[index]}
            priority={index === 0}
            alt="Kirai Product"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-full rounded-tr-2xl object-cover absolute"
          />
        </div>
      </div>
    </section>
  );
}
