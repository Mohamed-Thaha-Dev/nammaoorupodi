"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Heart,
  Eye,
  Bone,
  Brain,
  Shield,
  Zap,
  Droplets,
  Sun,
} from "lucide-react";
import Banner from "@/Components/Comman/Banner";
import SubHero from "@/Components/Comman/SubHero";

const healthBenefits = [
  {
    icon: <Heart size={28} strokeWidth={1.5} />,
    title: "Heart Health",
    desc: "Kirai leaves contain nutrients that support healthy blood pressure and cholesterol levels.",
  },
  {
    icon: <Eye size={28} strokeWidth={1.5} />,
    title: "Better Vision",
    desc: "High in vitamin A and beta-carotene, essential for maintaining sharp eyesight.",
  },
  {
    icon: <Bone size={28} strokeWidth={1.5} />,
    title: "Stronger Bones",
    desc: "Rich in calcium and vitamin K, helping build and maintain strong bones.",
  },
  {
    icon: <Brain size={28} strokeWidth={1.5} />,
    title: "Brain Function",
    desc: "Antioxidants and essential fatty acids support cognitive health and memory.",
  },
  {
    icon: <Shield size={28} strokeWidth={1.5} />,
    title: "Immunity Boost",
    desc: "Packed with vitamin C and zinc to strengthen the body's natural defense.",
  },
  {
    icon: <Zap size={28} strokeWidth={1.5} />,
    title: "Energy & Vitality",
    desc: "Iron-rich composition fights fatigue and keeps you energized throughout the day.",
  },
  {
    icon: <Droplets size={28} strokeWidth={1.5} />,
    title: "Better Digestion",
    desc: "Natural fiber content supports healthy gut function and regularity.",
  },
  {
    icon: <Sun size={28} strokeWidth={1.5} />,
    title: "Skin Glow",
    desc: "Vitamins A, C, and E work together to nourish skin from the inside out.",
  },
];
export default function BenefitsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hide first
      gsap.set(".fade-up", {
        opacity: 0,
        y: 40,
      });

      // Then animate
      gsap.to(".fade-up", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <div className="bg-[#f9f9f9] min-h-screen" ref={sectionRef}>
      <SubHero
        title="Health Benefits of Our Kirai Powder"
        subtitle=" Packed with essential nutrients, vitamins and minerals — our
          traditional keerai powder supports your overall wellness naturally."
      />

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {healthBenefits.map((item, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 fade-up"
            >
              {/* ICON */}
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 
group-hover:bg-green-600 group-hover:text-white 
group-hover:[&>svg]:stroke-white 
transition-all duration-300 mb-6"
              >
                {item.icon}
              </div>

              <h3 className="text-xl  mb-3 [font-family:var(--font-heading)]">{item.title}</h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Banner />
    </div>
  );
}
