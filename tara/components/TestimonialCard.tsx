import Image from 'next/image';
import React from 'react';

interface TestimonialCardProps {
    review: string;
}

const TestimonialCard = ({ review }: TestimonialCardProps) => {
    return (
        <div className='flex items-center justify-between p-4 bg-white w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] min-h-[250px] rounded-xl shadow-lg relative'>
            <div className='flex flex-col w-full'>
                <p className="absolute workSansMedium z-20 top-5 right-5 text-[70px] text-[#969696]">"</p>
                <div className='flex justify-center'>
                    {[...Array(5)].map((src, i) => (
                        <Image alt='star' key={i} src={"/star.png"} width={20} height={20} className="h-6 w-6 text-yellow-500"/>
                    ))}
                </div>
                <div className='mt-2 text-[#707070] relative z-30 px-2'>
                    <p className='text-center text-sm sm:text-base tracking-[0.90px]'>{review}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;