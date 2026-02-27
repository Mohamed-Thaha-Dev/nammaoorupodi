"use client";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

export default function OrderForm() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const products = ["Murungai Kirai", "Mudakathan Kirai", "Vallarai Kirai"];
const [submitted, setSubmitted] = useState(false);
  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: string,
  ) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, item]);
    } else {
      setSelectedProducts(selectedProducts.filter((p) => p !== item));
    }
  };

  const handleQuantityChange = (item: string, value: string) => {
    setQuantities({
      ...quantities,
      [item]: value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const formattedProducts = selectedProducts
        .map((product) =>
          quantities[product] ? `${product} - ${quantities[product]}g` : null,
        )
        .filter(Boolean)
        .join(", ");

      if (!formattedProducts) {
        alert("Please select at least one product with quantity.");
        return;
      }

      formData.append("access_key", "f4e15e2e-06e3-4129-8efe-09a8d4eef9d9");
      formData.append("products", formattedProducts);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);  
        
        form.reset();
        setSelectedProducts([]);
        setQuantities({});
      } else {
        alert("Submission failed ❌");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white p-10 rounded-l-2xl shadow-lg border border-green-100">

         {submitted ? (
  <div className="bg-card rounded-2xl border border-border p-10 text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-5">
      <CheckCircle className="h-8 w-8 text-green-600" />
    </div>
    <h3 className="text-xl font-semibold mb-2">
      Request Submitted!
    </h3>
    <p className="text-sm text-gray-600">
      Thank you! We'll reach out to you soon on WhatsApp or phone.
    </p>
    <button
      onClick={() => setSubmitted(false)}
      className="mt-6 text-green-600 font-medium text-sm hover:underline"
    >
      Submit another request
    </button>
  </div>
) :(
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium text-sm [font-family:var(--font-heading) font-normal]">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            placeholder="Enter your full name"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-medium text-sm [font-family:var(--font-heading) font-normal]">
            Mobile Number
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            required
            inputMode="numeric"
            maxLength={10}
            placeholder="e.g. 98765 43210"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
          />
          <p className="text-sm text-gray-500">
            <span className="text-red-600">*</span> We will send order updates
            to this number.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium text-sm [font-family:var(--font-heading) font-normal]">
            Select Products & Quantity (grams)
          </label>

          {products.map((item) => (
            <div
              key={item}
              className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={item}
                  onChange={(e) => handleProductChange(e, item)}
                  className="accent-green-600"
                />
                <span>{item}</span>
              </label>

              <input
                type="number"
                min="100"
                step="50"
                placeholder="e.g. 500"
                disabled={!selectedProducts.includes(item)}
                onChange={(e) => handleQuantityChange(item, e.target.value)}
                className="border rounded-lg px-3 py-2 w-full md:w-40 disabled:bg-gray-100"
              />
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-medium text-sm [font-family:var(--font-heading) font-normal]">
            Additional Notes (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Any special instructions?"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
        >
          {loading ? "Sending..." : "Submit Request"}
        </button>
      </form>
          )}
    </div>
  );
}
