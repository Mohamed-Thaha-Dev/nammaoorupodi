"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SubHero from "@/Components/Comman/SubHero";
import Banner from "@/Components/Comman/Banner";

gsap.registerPlugin(ScrollTrigger);

const recipes = [
  {
    title: "Kirai Idly",
    steps: [
      "Prepare regular idly batter as usual.",
      "Add 2 tablespoons of kirai powder to the batter.",
      "Mix well until evenly distributed.",
      "Steam the idlies for 10–12 minutes.",
      "Serve hot with chutney and sambar!",
    ],
  },
  {
    title: "Kirai Dosa",
    steps: [
      "Prepare dosa batter a day ahead.",
      "Add 1–2 tablespoons of kirai powder.",
      "Spread thin on hot tawa.",
      "Drizzle oil and cook until crispy.",
      "Fold and serve hot.",
    ],
  },
  {
    title: "Kirai Rice (Meals)",
    steps: [
      "Cook rice and let cool slightly.",
      "Heat oil, add mustard & curry leaves.",
      "Add 2–3 tablespoons kirai powder.",
      "Mix with cooked rice well.",
      "Season and serve.",
    ],
  },
];

export default function CookingGuide() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".guide-title", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.utils.toArray(".recipe-card").forEach((card: any) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        });

        gsap.from(card.querySelectorAll(".step"), {
          x: -50,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#f2ede2]  ">
      <SubHero
        title="Cooking Guide"
        subtitle=" Simple, delicious ways to add kirai powder to your everyday meals."
        showHeroExitAnimation={true}
      />
      {/* <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="guide-title text-5xl font-bold mb-4">
          Cooking Guide
        </h1>
        <p className="text-gray-600 text-lg">
          Simple, delicious ways to add kirai powder to your everyday meals.
        </p>
      </div> */}

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-10 px-6">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="recipe-card bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-semibold mb-6 text-green-700 [font-family:var(--font-heading)]">
              {recipe.title}
            </h2>

            <ol className="space-y-4">
              {recipe.steps.map((step, i) => (
                <li key={i} className="step flex items-start gap-4">
                  <span className="text-green-700 font-bold text-lg">
                    {i + 1}
                  </span>
                  <p className="text-gray-600">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <Banner/>
    </section>
  );
}
