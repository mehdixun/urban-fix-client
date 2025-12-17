// src/pages/Features.jsx
import React from "react";
import { Wrench, ShieldCheck, Clock, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Fast Service",
      description: "Quick response and lightning fast resolving of your home issues.",
      icon: <Clock size={48} className="mx-auto text-primary" />,
    },
    {
      id: 2,
      title: "Trusted Professionals",
      description: "Verified and skilled experts to ensure safe, quality service.",
      icon: <ShieldCheck size={48} className="mx-auto text-primary" />,
    },
    {
      id: 3,
      title: "All-in-One Solution",
      description: "Plumbing, electrical, appliance repair — everything in one place.",
      icon: <Wrench size={48} className="mx-auto text-primary" />,
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "We are available day and night to assist you anytime.",
      icon: <Users size={48} className="mx-auto text-primary" />,
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Our Key Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-base-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
