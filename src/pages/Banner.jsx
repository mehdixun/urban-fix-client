// src/components/Banner.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from '../assets/allteam.jpg';
import bannerImg2 from '../assets/working.jpg';
import bannerImg3 from '../assets/waterfixing.jpg';
import bannerImg4 from '../assets/teamwalking.jpg';

const Banner = () => {
    const images = [bannerImg1, bannerImg2, bannerImg3, bannerImg4];

    return (
        <div className="w-full md:h-[450px] h-[250px] my-10 rounded-xl overflow-hidden shadow-lg">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3500}
                stopOnHover
                swipeable
                emulateTouch
            >
                {images.map((img, index) => (
                    <div key={index} className="relative w-full h-full">
                        <img
                            src={img}
                            alt={`Banner ${index + 1}`}
                            className="w-full h-[250px] md:h-[450px] object-cover"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                        {/* Text */}
                        <div className="absolute left-6 md:left-12 bottom-6 md:bottom-12 text-white max-w-lg">
                            <h2 className="text-lg md:text-4xl font-bold drop-shadow-lg">
                                Smart City Issue Reporting
                            </h2>
                            <p className="text-xs md:text-base opacity-90 mt-1">
                                Report problems easily. Let’s improve our city together.
                            </p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
