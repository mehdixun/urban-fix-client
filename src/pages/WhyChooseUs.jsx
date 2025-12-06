import React from "react";

const WhyChooseUs = () => {
  const items = [
    {
      title: "Certified Technicians",
      desc: "Every technician is verified, skilled, and background-checked.",
    },
    {
      title: "Fast Response",
      desc: "Our team reaches your location faster than traditional services.",
    },
    {
      title: "Transparent Pricing",
      desc: "Clear pricing — no hidden charges or extra fees.",
    },
  ];

  return (
    <div className="py-20 px-5 bg-base-100">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
        Why Choose UrbanFix?
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {items.map((i, index) => (
          <div
            key={index}
            className="
              p-8 bg-base-200 rounded-2xl shadow-xl
              border border-transparent hover:border-primary
              hover:shadow-primary/40 transition duration-300
            "
          >
            <h3 className="text-2xl font-semibold mb-3">{i.title}</h3>
            <p className="opacity-75">{i.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
