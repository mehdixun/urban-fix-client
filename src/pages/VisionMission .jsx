import React from "react";

const VisionMission = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Vision & Mission
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We aim to build a cleaner, safer, and smarter city where technology
            empowers citizens to report issues easily and ensures transparent,
            fast solutions for everyone.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4">🌍</div>
            <h3 className="text-2xl font-semibold mb-2">Cleaner Environment</h3>
            <p className="text-gray-600">
              Report problems like garbage overflow, damaged roads, or water
              leakage and help keep your city clean and healthy.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-semibold mb-2">Faster Resolution</h3>
            <p className="text-gray-600">
              Track issue status in real time and get faster responses through a
              smart digital system designed for efficiency.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-2xl font-semibold mb-2">Citizen Empowerment</h3>
            <p className="text-gray-600">
              Every reported issue contributes to a better city — empowering
              citizens to actively participate in community improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
