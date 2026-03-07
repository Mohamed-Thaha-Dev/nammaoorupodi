"use client";

import { usePathname } from "next/navigation";
import WhatsappButton from "./WhatsappBotton";

export default function WhatsappWrapper() {
  const pathname = usePathname();
  if (pathname?.startsWith("/order") || pathname?.startsWith("/contact")) {
    return null;
  }

  return <WhatsappButton />;
}
