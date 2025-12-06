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
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
        How It Works
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {steps.map((s) => (
          <div
            key={s.id}
            className="
            relative group rounded-2xl p-[1px] 
            bg-gradient-to-r from-primary to-secondary shadow-xl
            hover:shadow-primary/60 transition duration-300
          "
          >
            <div
              className="
              bg-base-100 backdrop-blur-md rounded-2xl p-8 h-full
              flex flex-col items-center text-center
              group-hover:scale-[1.02] transition duration-300
            "
            >
              <div className="text-primary group-hover:scale-110 transition">
                {s.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">{s.title}</h3>
              <p className="opacity-75 text-sm">{s.desc}</p>

              <span className="absolute -top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm shadow-md">
                Step {s.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
