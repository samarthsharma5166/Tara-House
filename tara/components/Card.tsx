import Image from 'next/image'
import React from 'react'

const Card = ({img,content,heading}:{img:string,content:string,heading:string}) => {
  return (
    <div className='flex items-center justify-between p-4 bg-white md:w-sm min-h-[200px] sm:min-w-[320px] px-5 rounded-xl shadow-lg relative' >
              <div className='flex flex-col justify-center items-center px-4 py-4'>
                  <div className='flex justify-center'>
                      <Image  alt='start' src={img} width={40} height={40}></Image>
                  </div>
                  <div className='mt-2 text-center'>
                  <h1 className='text-[18px] text-black leading-6 alegreya-sans-medium'>{heading}</h1>
                  <p className='text-center text-[#707070] text-[16px] workSansLight tracking-[0.88px]'>{content}</p>
                  </div>
              </div>
    </div>
  )
}

export default Card