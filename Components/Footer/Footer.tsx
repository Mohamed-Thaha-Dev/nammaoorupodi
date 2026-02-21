"use client";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Image from "next/image";

function Footer() {
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "#home" },
        { label: "About Us", href: "#about" },
        { label: "Products", href: "#products" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Useful Links",
      links: [
        { label: "FAQs", href: "#faq" },
        { label: "Custom Orders", href: "#contact" },
        {
          label: "WhatsApp Enquiry",
          href: "https://wa.me/919080132563",
          pulse: true,
        },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} />,
      text: "nammaoorupodi2026@gmail.com",
      href: "mailto:nammaoorupodi2026@gmail.com",
    },
    {
      icon: <Phone size={18} />,
      text: "+91 86102 40143",
      href: "tel:+918610240143",
    },
    {
      icon: <MapPin size={18}  />,
      text: "Chennai, Tamil Nadu",
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Youtube size={20} />, label: "Linkedin", href: "#" },
  ];

  return (
    <footer className="bg-[#685241] text-white relative">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <Image
              width={200}
              height={200}
                src="/logo.webp"
                alt="Kirai Logo"
                className="w-50 h-30 rounded-full"
              />
            </div>

            <p className="text-sm leading-relaxed text-white">
              Traditional leaf powders crafted with purity,
              bringing natural wellness to every home.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6 relative pb-2">
                {section.title}
                <span className="absolute left-0 bottom-0 w-10 h-[3px] bg-gradient-to-r from-green-400 to-lime-300 rounded-full"></span>
              </h4>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors text-white"
                    >
                      {link.label}
                    </a>

                    {link.pulse && (
                      <span className="absolute -left-4 top-2 w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6 relative pb-2">
              Contact Us
              <span className="absolute left-0 bottom-0 w-10 h-[3px] bg-gradient-to-r from-green-400 to-lime-300 rounded-full"></span>
            </h4>

            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-white">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="transition-colors text-white"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white pt-6 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">

          {/* Social */}
          <div className="flex space-x-6 text-green-300">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="text-white transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          <p className="text-white">
            © {new Date().getFullYear()} Nammaoorupodi. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
