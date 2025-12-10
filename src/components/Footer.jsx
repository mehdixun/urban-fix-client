import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-indigo-50 text-gray-800 py-10">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-6">

        {/* Branding */}
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-indigo-600 drop-shadow-lg">UrbanFix</h2>
          <p className="mt-4 font-semibold text-gray-700 leading-relaxed max-w-sm mx-auto lg:mx-0">
            Fast, trusted, and local services for your home or business — all in one place. <br />
            <span className="text-indigo-500 font-bold">Just a click away</span>.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="text-indigo-600 font-semibold space-y-2">
            <li>
              <a href="/" className="hover:border-b-2 inline-block transition-transform duration-300 hover:scale-105">
                Home
              </a>
            </li>
            <li>
              <a href="/services" className="hover:border-b-2 inline-block transition-transform duration-300 hover:scale-105">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:border-b-2 inline-block transition-transform duration-300 hover:scale-105">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="text-center lg:text-left">
          <h3 className="text-lg font-bold mb-3">Contact</h3>
          <p className="text-indigo-600 font-semibold">Email: support@urbanfix.com</p>
          <p className="text-indigo-600 font-semibold">Phone: +880 1336 458100</p>

          <div className="flex justify-center lg:justify-start mt-4 space-x-5">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 transform hover:scale-110 transition duration-200">
              <FaFacebookF size={28} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700 transform hover:scale-110 transition duration-200">
              <FaInstagram size={28} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transform hover:scale-110 transition duration-200">
              <BsTwitter size={28} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-600 text-sm">
        &copy; 2025 UrbanFix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
