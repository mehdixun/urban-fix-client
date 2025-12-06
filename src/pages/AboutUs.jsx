import React from "react";
import { Wrench, Shield, Users, Building2 } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary">About UrbanFix</h2>
        <p className="mt-3 text-gray-600 text-lg">
          We connect people with fast, trusted, on-demand repair services.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-xl transition">
          <Wrench className="w-10 h-10 text-primary mb-3" />
          <h3 className="text-xl font-semibold mb-2">Easy Fixing</h3>
          <p className="text-gray-600">
            Report any issue in a tap, and we’ll handle the rest for you.
          </p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-xl transition">
          <Shield className="w-10 h-10 text-primary mb-3" />
          <h3 className="text-xl font-semibold mb-2">Safe & Verified</h3>
          <p className="text-gray-600">
            All technicians are background verified & skilled.
          </p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-xl transition">
          <Users className="w-10 h-10 text-primary mb-3" />
          <h3 className="text-xl font-semibold mb-2">1000+ Users</h3>
          <p className="text-gray-600">
            A growing community trusting UrbanFix every day.
          </p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-xl transition">
          <Building2 className="w-10 h-10 text-primary mb-3" />
          <h3 className="text-xl font-semibold mb-2">City-Wide Support</h3>
          <p className="text-gray-600">
            Available across multiple zones in your city.
          </p>
        </div>

      </div>

      {/* Bottom Text */}
      <div className="mt-12 text-center">
        <p className="text-gray-700 text-lg">
          We are on a mission to make repair services faster, smarter & more reliable.
        </p>
      </div>

    </div>
  );
};

export default AboutUs;
