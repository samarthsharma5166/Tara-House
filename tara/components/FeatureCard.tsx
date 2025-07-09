import Image from 'next/image'
import React from 'react'


const FeatureCard = ({title,img}:{title:string,img:string}) => {
  return (
    <div className='w-full md:w-auto bg-white p-4 shadow-md rounded-md'>
        <div className='flex gap-4 items-center'>
            <Image alt='img' src={img} width={36} height={36}></Image>
        <h1 className='w-full text-[18px] workSansMedium'>{title}</h1>
        </div>
    </div>
  )
}

export default FeatureCard