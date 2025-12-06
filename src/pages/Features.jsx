import React from "react";
import { Wrench, ShieldCheck, Clock, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Fast Service",
      description: "Quick response and lightning fast resolving of your home issues.",
      icon: <Clock size={40} />,
    },
    {
      id: 2,
      title: "Trusted Professionals",
      description: "Verified and skilled experts to ensure safe, quality service.",
      icon: <ShieldCheck size={40} />,
    },
    {
      id: 3,
      title: "All-in-One Solution",
      description: "Plumbing, electrical, appliance repair — everything in one place.",
      icon: <Wrench size={40} />,
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "We are available day and night to assist you anytime.",
      icon: <Users size={40} />,
    },
  ];

  return (
    <div className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto px-5">
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Our Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-base-100 rounded-xl shadow hover:shadow-lg transition duration-200 text-center"
            >
              <div className="flex justify-center mb-4 text-primary">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="opacity-80">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Features;
