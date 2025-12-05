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
        <div className="w-full md:h-[450px] h-[250px] rounded-xl overflow-hidden shadow-lg">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                interval={3000}
                stopOnHover={false}
            >
                {images.map((img, index) => (
                    <div key={index} className="relative">
                        {/* Image */}
                        <img
                            src={img}
                            className="object-cover w-full md:h-[450px] h-[250px]"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>

                        {/* Text Content */}
                        <div className="absolute left-6 bottom-6 text-white">
                            <h2 className="text-xl md:text-3xl font-bold drop-shadow-md">
                                Smart City Issue Reporting
                            </h2>
                            <p className="text-sm md:text-base opacity-90 mt-1">
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
