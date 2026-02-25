"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Our Kirai", href: "/product" },
  { name: "How to Use", href: "/cooking-guide" },
  { name: "Benefits", href: "/benefits" },
  { name: "Order", href: "/order" },
  { name: "Contact", href: "/contact" },
];

export default function MenuBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  console.log(pathname);

  return (
    <nav className="w-full bg-[#d6dbcd]/70 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-22">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Image
            width={100}
            height={100}
              src="/logo.webp"
              alt="Kirai Powders"
              className="w-full h-20 object-contain"
            />
            {/* <h1 className="text-xl font-semibold text-green-900">
              Namma Ooru Podi
            </h1> */}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-md font-medium transition-all duration-200   ${
                  (link.href === "/" && pathname === "/") ||
                  (link.href !== "/" && pathname.startsWith(link.href))
                    ? "bg-green-600 text-white"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-green-900"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#f5f3ee] border-t border-green-100 px-4 pb-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block py-2 text-green-900 hover:text-green-600"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
