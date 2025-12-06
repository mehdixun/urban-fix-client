import React from "react";
import { Wrench, Shield, Users, Building2, CheckCircle, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-primary">About UrbanFix</h2>
        <p className="mt-4 text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          UrbanFix is your go-to platform for reporting and resolving public infrastructure issues efficiently. From potholes to broken streetlights, we make city maintenance simple, fast, and transparent for every citizen.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300">
          <Wrench className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Reporting</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Citizens can submit issues instantly with photos, location & description. No paperwork, no hassle.
          </p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300">
          <Shield className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Safe & Verified</h3>
          <p className="text-gray-600 text-sm md:text-base">
            All technicians and staff are background-verified. Each task is monitored to ensure quality & accountability.
          </p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300">
          <Users className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Trusted by Thousands</h3>
          <p className="text-gray-600 text-sm md:text-base">
            A growing community of citizens rely on UrbanFix daily. Transparency & efficiency keep users confident.
          </p>
        </div>

        <div className="bg-base-200 p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300">
          <Building2 className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">City-Wide Coverage</h3>
          <p className="text-gray-600 text-sm md:text-base">
            We operate across multiple districts, ensuring timely updates & faster resolutions for every reported issue.
          </p>
        </div>
      </div>

      {/* How We Work */}
      <div className="mt-16 text-center">
        <h3 className="text-3xl font-bold text-primary mb-6">How UrbanFix Works</h3>
        <div className="max-w-3xl mx-auto text-left space-y-4 text-gray-700">
          <p><CheckCircle className="inline w-5 h-5 text-primary mr-2" /> Citizens submit a report with photos, location, and description.</p>
          <p><CheckCircle className="inline w-5 h-5 text-primary mr-2" /> Admin verifies and assigns staff to resolve the issue.</p>
          <p><CheckCircle className="inline w-5 h-5 text-primary mr-2" /> Staff updates progress and marks the task resolved.</p>
          <p><CheckCircle className="inline w-5 h-5 text-primary mr-2" /> Citizens receive real-time updates and can track status anytime.</p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="mt-16 text-center">
        <h3 className="text-3xl font-bold text-primary mb-4">Our Mission</h3>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
          To make city infrastructure management smarter, faster, and fully transparent. UrbanFix bridges citizens and authorities for a cleaner, safer, and well-maintained city.
        </p>
      </div>

      {/* Vision */}
      <div className="mt-12 text-center">
        <h3 className="text-3xl font-bold text-primary mb-4">Our Vision</h3>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
          A city where every issue is resolved promptly, citizens are empowered, and urban services run efficiently without delays.
        </p>
      </div>

      {/* Global Reach / Stats */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        <div className="p-6 bg-base-200 rounded-xl shadow hover:shadow-lg transition">
          <Globe className="w-12 h-12 text-primary mb-3 mx-auto" />
          <h3 className="text-2xl font-bold">64 Districts</h3>
          <p className="text-gray-600">Our services span across multiple districts ensuring wide coverage.</p>
        </div>
        <div className="p-6 bg-base-200 rounded-xl shadow hover:shadow-lg transition">
          <Users className="w-12 h-12 text-primary mb-3 mx-auto" />
          <h3 className="text-2xl font-bold">1000+ Users</h3>
          <p className="text-gray-600">Thousands of citizens trust UrbanFix for reporting and resolving issues efficiently.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
