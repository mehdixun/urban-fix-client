import React from "react";
import { Wrench, ClipboardCheck, UserCheck, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <ClipboardCheck size={45} />,
      title: "Submit Your Issue",
      desc: "Describe your problem in detail and request a technician.",
    },
    {
      id: 2,
      icon: <UserCheck size={45} />,
      title: "Get Verified Technician",
      desc: "We assign a skilled & verified professional for your request.",
    },
    {
      id: 3,
      icon: <Wrench size={45} />,
      title: "Problem Fixed",
      desc: "Our expert arrives on time and resolves the issue efficiently.",
    },
    {
      id: 4,
      icon: <Truck size={45} />,
      title: "Secure Payment",
      desc: "Complete payment safely after the service is successfully done.",
    },
  ];

  return (
    <div className="py-20 px-5 bg-base-200">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary">
        How It Works
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step) => (
          <div
            key={step.id}
            className="relative group rounded-2xl from-primary to-secondary shadow-lg hover:shadow-primary/50 transition duration-300"
          >
            <div className="bg-white backdrop-blur-md rounded-2xl p-8 flex flex-col items-center text-center group-hover:scale-105 transition-transform duration-300 h-full relative">
              <div className="text-primary mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>

              <span className="absolute -top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm shadow-md">
                Step {step.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
