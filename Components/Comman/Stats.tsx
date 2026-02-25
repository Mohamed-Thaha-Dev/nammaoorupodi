"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numbersRef.current.forEach((el) => {
        const endValue = parseInt(el.getAttribute("data-value") || "0");

        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: endValue,
            duration: 2,
            ease: "power1.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              
            },
          },
        );
      });
    }, sectionRef);
    // ScrollTrigger.refresh(); // 👈 ADD THIS


    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLSpanElement | null) => {
    if (el && !numbersRef.current.includes(el)) {
      numbersRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center ">
        {/* Stat 1 */}
        <div>
          <h2 className="text-5xl font-semibold  text-green-600 [font-family:var(--font-heading)]">
            <span ref={addToRefs} data-value="5">
              0
            </span>
            +
          </h2>
          <p className="mt-2 text-sm text-gray-600">Years of Tradition</p>
        </div>

        {/* Stat 2 */}
        <div>
          <h2 className="text-5xl font-semibold text-green-600 [font-family:var(--font-heading)]">
            <span ref={addToRefs} data-value="5000">
              0
            </span>
            +
          </h2>
          <p className="mt-2 text-sm">Happy Customers</p>
        </div>

        {/* Stat 3 */}
        <div>
          <h2 className="text-5xl font-semibold text-green-600 [font-family:var(--font-heading)]">
            <span ref={addToRefs} data-value="100">
              0
            </span>
            %
          </h2>
          <p className="mt-2 text-sm">Natural Ingredients</p>
        </div>

        {/* Stat 4 */}
        <div>
          <h2 className="text-5xl font-semibold text-green-600 [font-family:var(--font-heading)]">
            <span ref={addToRefs} data-value="0">
              0
            </span>
            %
          </h2>
          <p className="mt-2 text-sm">Chemicals Used</p>
        </div>
      </div>
    </section>
  );
}
