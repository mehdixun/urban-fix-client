import React from "react";

const VisionMission = () => {
  const cards = [
    {
      emoji: "🌍",
      title: "Cleaner Environment",
      desc: "Report problems like garbage overflow, damaged roads, or water leakage and help keep your city clean and healthy.",
    },
    {
      emoji: "⚡",
      title: "Faster Resolution",
      desc: "Track issue status in real time and get faster responses through a smart digital system designed for efficiency.",
    },
    {
      emoji: "🤝",
      title: "Citizen Empowerment",
      desc: "Every reported issue contributes to a better city — empowering citizens to actively participate in community improvement.",
    },
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary">
            Our Vision & Mission
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
            We aim to build a cleaner, safer, and smarter city where technology
            empowers citizens to report issues easily and ensures transparent,
            fast solutions for everyone.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="text-6xl md:text-7xl mb-4">{card.emoji}</div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-base md:text-lg">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
