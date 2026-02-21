"use client";
import Image from "next/image";
import React from "react";


const products = [
  {
    id: 1,
    name: "Murungai Keerai (Moringa Leaves) Powder",
    desc: "Rich in vitamins, iron, and calcium. Supports immunity and improves overall health naturally.",
    img: "/products/powder-1.jpg",
  },
  {
    id: 2,
    name: "Mudakathan Keerai (Balloon Vine Leaves) Powder",
    desc: "Traditional herbal leaf known for supporting joint health and improving body flexibility.",
    img: "/products/powder-2.jpg",
  },
  {
    id: 3,
    name: "Vallarai Keerai (Centella Asiatica) Powder",
    desc: "Helps enhance memory, improve concentration, and supports brain health naturally.",
    img: "/products/powder-3.jpg",
  },
];

const ProductSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-green-900">
            Our Organic Collection
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Naturally crafted powders for healthy living.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="break-inside-avoid bg-white rounded-3xl shadow-lg overflow-hidden transition duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              <Image
                width={300}
                height={300}
                src={product.img}
                alt={product.name}
                className="w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {product.desc}
                </p>

                <button className="px-6 py-2 rounded-full bg-green-700 text-white text-sm hover:bg-green-800 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
