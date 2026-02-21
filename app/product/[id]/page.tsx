'use client'
import React, { useState } from "react";

const product = {
  name: "Murungai Kirai Powder",
  price: 249,
  description:
    "Murungai powder is rich in iron and vitamins. Helps improve immunity and overall wellness.",
  image: "/products/powder-1.jpg",
  benefits: [
    "Boosts immunity",
    "Improves digestion",
    "Rich in iron",
    "100% Natural & Chemical Free",
  ],
};

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Product Image */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[450px] object-cover rounded-2xl"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-green-900 mb-4">
              {product.name}
            </h1>

            <p className="text-2xl font-semibold text-green-700 mb-6">
              ₹ {product.price}
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Benefits */}
            <ul className="space-y-2 mb-8">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-green-600">✔</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="w-10 h-10 bg-green-100 rounded-full"
              >
                -
              </button>

              <span className="text-lg font-semibold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-green-100 rounded-full"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button className="w-full md:w-auto px-10 py-4 bg-green-700 text-white rounded-full hover:bg-green-800 transition font-semibold">
              Add to Cart 🛒
            </button>

          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-green-900 mb-10">
            Related Products 🌿
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-3 transition"
              >
                <img
                  src={`/products/powder-${item}.jpg`}
                  alt="Related Product"
                  className="w-full h-60 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-green-900">
                    Organic Kirai Powder
                  </h3>
                  <p className="text-green-700 font-semibold mt-2">
                    ₹ 249
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductPage;
