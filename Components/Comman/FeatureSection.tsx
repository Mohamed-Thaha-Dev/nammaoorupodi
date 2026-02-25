

import { Truck, IndianRupee, Leaf } from "lucide-react";

export default function FeatureSection() {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

        {/* Card 1 */}
        <div className="group space-y-4 p-6 rounded-xl hover:bg-white transition duration-300">
          <Truck
            className="mx-auto text-green-600 transition-transform duration-500 group-hover:rotate-x-360"
            size={40}
          />
          <h3 className="text-xl font-normal [font-family:var(--font-heading)]">
            Free Shipping Pan India
          </h3>
          <p className="text-gray-600 text-sm">
            On orders above Rs.399
          </p>
        </div>

        {/* Card 2 */}
        <div className="group space-y-4 p-6 rounded-xl hover:bg-white transition duration-300">
          <IndianRupee
            className="mx-auto text-green-600 transition-transform duration-500 group-hover:rotate-x-360"
            size={40}
          />
          <h3 className="text-xl font-normal [font-family:var(--font-heading)]">
            Value for Money
          </h3>
          <p className="text-gray-600 text-sm">
            Only Healthy. No Chemicals
          </p>
        </div>

        {/* Card 3 */}
        <div className="group space-y-4 p-6 rounded-xl hover:bg-white transition duration-300">
          <Leaf
            className="mx-auto text-green-600 transition-transform duration-500 group-hover:rotate-x-360"
            size={40}
          />
          <h3 className="text-xl font-normal [font-family:var(--font-heading)]">
            Zero Preservatives
          </h3>
          <p className="text-gray-600 text-sm">
            Naturally Processed
          </p>
        </div>

      </div>
    </section>
  );
}