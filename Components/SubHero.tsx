"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroTextProps {
  tag?: string;
  title: string;
  subtitle: string;
  bg?: string;
  showHeroExitAnimation?: boolean;
}

export default function SubHero({
  tag,
  title,
  subtitle,
  showHeroExitAnimation = true,
  bg,
}: HeroTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showHeroExitAnimation) return;

    const ctx = gsap.context(() => {
      const elements =
        containerRef.current?.querySelectorAll(".hero-animate > *");

      if (!elements) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom%",
          end: "top+=400 top",
          scrub: 1.2,
        },
      });

      elements.forEach((el, i) => {
        tl.to(
          el,
          {
            rotationX: 80,
            y: -40,
            scale: 0.9,
            opacity: 0,
            filter: "blur(6px)",
            transformOrigin: "center top",
            ease: "power2.out",
          },
          i * 0.1,
        );
      });
    }, containerRef);
    gsap.to(containerRef.current, {
      backgroundColor: bg,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "top 40%",
        scrub: true,
      },
    });

    return () => ctx.revert();
  }, [showHeroExitAnimation]);

  return (
    <div
      ref={containerRef}
      className={`text-center pt-15 pb-10 px-5 perspective-[1000px]`}
      style={{ backgroundColor: bg ?? "transparent" }}
    >
      <div className="hero-animate space-y-4">
        <p className="text-sm tracking-[8px] uppercase text-green-600">{tag}</p>

        <h1 className="text-4xl md:text-5xl font-semibold">{title}</h1>

        <p className="max-w-xl mx-auto text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}
