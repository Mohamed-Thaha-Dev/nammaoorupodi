"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface WhatsappButtonProps {
  phone?: string;
  message?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export default function WhatsappButton({
  phone = "919944078982",
  message = "Vanakkam! I would like to know more about your Products.",
  position = "bottom-right",
}: WhatsappButtonProps) {
  const btnRef = useRef<HTMLAnchorElement | null>(null);

  const encodedMessage = encodeURIComponent(message);
  const link = `https://wa.me/${phone}?text=${encodedMessage}`;

  const positionClass: Record<string, string> = {
    "bottom-right": "bottom-8 right-6",
    "bottom-left": "bottom-5 left-5",
    "top-right": "top-5 right-5",
    "top-left": "top-5 left-5",
  };

  useEffect(() => {
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        y: -12,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <a
      ref={btnRef}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed ${positionClass[position]} z-50`}
    >
      {/* Glow Background */}
      <div className="absolute inset-0 rounded-full blur-xl bg-[#25D366]  opacity-60 animate-pulse"></div>

      {/* Button */}
      {/* <div className="bg-white rounded-full w-14 h-14 flex justify-center items-center hover:scale-110 transition-all duration-300"> */}
      <div className="flex md:h-15 md:w-15 h-11 w-11 items-center justify-center rounded-full bg-[#25D366]">
        <Image
          width={50}
          height={50}
          src="/images/whatsappLogo.webp"
          alt="Whatsapp Logo"
          title="Whatsapp Logo"
          className="md:h-13 md:w-13 h-10 w-10 "
        />
      </div>
      {/* </div> */}
    </a>
  );
}
