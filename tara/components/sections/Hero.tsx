import React from "react";
import CustomCarousel from "../CustomCarousel";
import { ArrowRight } from "lucide-react";
import FeatureCard from "../FeatureCard";

const FeatureCardContent = [
  {
    title: 'Bulk Order',
    img: '/Bulk.png'
  },
  {
    title: "Factory Prices",
    img: '/money.png'
  },
  {
    title: "Fast Dispatch",
    img: "/orderBox.png"
  },
  {
    title: "PAN India Delivery",
    img: "/india.png"
  }
];

const Hero = () => {
  return (
    <div className="w-full border border-b-2 border-gray-200 flex flex-col md:flex-row gap-8 bg-gray-50">
      <div className="md:w-xs h-full flex flex-col items-center gap-10 justify-center bg-black pb-4">
        {/* Carousel Container */}
        <div className="w-full">
          <CustomCarousel />
        </div>
        <div className="flex flex-col justify-end w-full px-4 font-extralight">
          <h1 className="text-[18px] text-white font-medium tracking-[0.4px] flex items-center gap-2 workSansMedium">
            (See All ){<ArrowRight />}</h1>
          <div className="text-xl text-white workSansMedium tracking-widest">Tara Crockery house</div>
        </div>
      </div>

      {/* Right side content */}
      <div className="px-4 md:px-8 w-full flex justify-evenly flex-col bg-transparent">
        <div>
          <h1 className="md:text-[52px] md:mt-3 mt-3 leading-tight text-4xl font-bold md:leading-[58px] tracking-[0.8px] md:max-w-4xl workSansBold">
            Welcome to Tara Crockery House
          </h1>
          <h3 className="text-[24px] font-medium md:mt-3 mt-3 leading-[32px] tracking-[0.3px] workSansMedium">
            Your Trusted Crockery Wholesaler & Trading Partner in Khurja
          </h3>
          <p className="text-[18px] font-normal md:mt-2 mt-2 leading-[30px] tracking-[0.2px] workSansRegular">
            We are a leading name in crockery trading and wholesale supply...
          </p>
          <div className="w-full mt-4 justify-start flex gap-4 flex-wrap">
            {FeatureCardContent.map((item, index) => (
              <FeatureCard key={index} title={item.title} img={item.img} />
            ))}
          </div>

          <div>
            <button className="mt-8 mb-8 border rounded-lg hover:bg-black hover:text-white border-black px-4 py-2 workSansMedium">
              <span className="flex items-center gap-2">
                Explore Collection <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;