import React from "react";

const Testimonials = () => {
  const feedbacks = [
    {
      name: "Rahim",
      comment: "Amazing service! Fast, polite, and highly professional.",
    },
    {
      name: "Jannat",
      comment: "Loved the experience — pricing was super clear and fair.",
    },
    {
      name: "Kabir",
      comment: "Technician was skilled and solved my issue smoothly.",
    },
  ];

  return (
    <div className="py-20 px-5 bg-base-200">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
        Customer Experiences
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {feedbacks.map((f, index) => (
          <div
            key={index}
            className="
              p-8 bg-base-100 rounded-2xl shadow-xl
              hover:shadow-secondary/50 hover:-translate-y-1 
              transition duration-300
            "
          >
            <p className="opacity-75 italic">“{f.comment}”</p>
            <h4 className="font-bold mt-4 text-right">— {f.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
