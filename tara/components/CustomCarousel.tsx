"use client"

import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"

const images = [
    "/hero1.jpg",
    "/hero2.jpg",
    "/hero3.png",
]

const CustomCarousel = () => {
    const [curr, setCurr] = useState(0);

    const prev = () => setCurr(curr === 0 ? images.length - 1 : curr - 1);
    const next = () => setCurr(curr === images.length - 1 ? 0 : curr + 1);

    return (
        <div className="w-full pt-4 px-4 mt-4 max-w-xs mx-auto">
            <div className="overflow-hidden h-[300px] relative rounded-lg">
                <div
                    className="flex transition-transform ease-out duration-500"
                    style={{ transform: `translateX(-${curr * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div className="min-w-full h-[300px]" key={index}>
                            <Image
                                src={image}
                                width={600}
                                height={300}
                                alt={`hero-${index}`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-4 mt-4 px-4 text-white">
                <button onClick={prev}>
                    <ArrowLeft />
                </button>
                <button onClick={next}>
                    <ArrowRight />
                </button>
            </div>
        </div>
    );
};

export default CustomCarousel;

