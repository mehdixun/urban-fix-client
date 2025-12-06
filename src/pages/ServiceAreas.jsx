import React, { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

// Helper to smoothly fly to searched district
const FlyToLocation = ({ coords }) => {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 12, { duration: 1.5 });
  }
  return null;
};

const ServiceAreas = () => {
  const defaultPosition = [23.685, 90.3563]; // Center of Bangladesh
  const serviceAreas = useLoaderData() || [];
  const [searchCoords, setSearchCoords] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.location.value.trim().toLowerCase();
    const found = serviceAreas.find((c) =>
      c.district.toLowerCase().includes(query)
    );

    if (found) {
      setSearchCoords([found.latitude, found.longitude]);
    } else {
      alert("No district found!");
      setSearchCoords(null);
    }

    e.target.reset();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-center mb-6">
        Coverage Map - Our Service Areas
      </h2>
      <p className="text-center mb-8 text-gray-600">
        Explore all the districts where our services are available. Use the search bar to quickly locate a specific district.
      </p>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row justify-center items-center gap-3 mb-6"
      >
        <label className="relative w-full md:w-1/3">
          <input
            type="search"
            name="location"
            required
            placeholder="Search district"
            className="input input-bordered w-full pr-10"
          />
          <svg
            className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2"></circle>
            <path d="M21 21l-4.3-4.3" strokeWidth="2"></path>
          </svg>
        </label>
        <button type="submit" className="btn btn-primary mt-2 md:mt-0">
          Search
        </button>
      </form>

      {/* Map */}
      <div className="h-[400px] md:h-[600px] rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={defaultPosition}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceAreas.map((center, idx) => (
            <Marker
              key={idx}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <strong>{center.district}</strong>
                <br /> Service Available
              </Popup>
            </Marker>
          ))}

          {searchCoords && <FlyToLocation coords={searchCoords} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default ServiceAreas;
