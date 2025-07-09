"use client"
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';

function ImageViewer({ images }: { images: string[] }) {
  const [imgIndex, setImgIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function switchImage() {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setImgIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1500);
    }
  }

  function stopImageSwitch() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      stopImageSwitch();
    };
  }, []);

  return (
    <div
      onMouseEnter={switchImage}
      onMouseLeave={stopImageSwitch}
      className='w-full h-[280px] flex justify-center items-center relative overflow-hidden rounded-xl bg-white'
    >
      {/* Image Container */}
      <div className='relative w-[260px] h-[260px] rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-gray-100 transition-all duration-300'>
        <Image
          width={500}
          height={500}
          src={JSON.parse(images[imgIndex]).secure_url}
          alt="Product Image"
          className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
          priority
        />

        {/* Subtle overlay for better contrast */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>

      {/* Image Indicators */}
      {images.length > 1 && (
        <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setImgIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${index === imgIndex
                  ? 'bg-black scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageViewer;