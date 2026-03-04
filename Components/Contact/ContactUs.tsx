"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import SubHero from "../Comman/SubHero";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("access_key", "bd88d88c-bf01-4360-8338-a7a38247f8b8");
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);
      formData.append("phone", form.phone);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      console.log(response);
      setForm({ name: "", email: "", phone: "", message: "" });
      alert("Message Submitted Successfully 🌿");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f6f9f4] min-h-screen">
      <SubHero
        title="Contact us"
        subtitle="We'd love to hear from you. Reach out for orders or enquiries."
        tag="Connect With Us"
      />

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-green-900 mb-8 [font-family:var(--font-heading)]">
            Get in Touch
          </h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="text-green-700" />
              <span className="text-gray-700">nammaoorupodi@gmail.com</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-green-700" />
              <span className="text-gray-700">+91 86102 40143</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-green-700" />
              <span className="text-gray-700">Chennai, Tamil Nadu</span>
            </div>
          </div>

          <p className="mt-10 text-gray-600 leading-relaxed">
            We provide fresh, organic kirai powders prepared using traditional
            methods. Contact us for bulk orders, custom requests, or retail
            enquiries.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-10 rounded-3xl shadow-xl">
          <h3 className="text-2xl font-semibold text-green-900 mb-6 [font-family:var(--font-heading)]">
            Send a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Your Message"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition"
            >
              {loading ? "Sending ...." : "Send Message 🌿"}
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18..."
            width="100%"
            height="400"
            loading="lazy"
            className="rounded-3xl shadow-lg"
          ></iframe>
        </div>
      </section> */}
    </div>
  );
}
