import React from 'react'
import SectionHeading from '../SectionHeading'
import Card from '../Card'

const whyChooseUsContent = [
    {       
        img: '/factory.png',
        heading: "Direct from Manufacturer",
        content: "Skip the middleman and get factory pricing straight from our Khurja unit."
    },
    {
        img:'/tools.png',
        heading:"Custom Orders Available",
        content:"Need branding, logos, or unique patterns? We customize to your needs."
    },
    {
        img: '/orderBox.png',
        heading: "Bulk Trading Experts",
        content: "Trusted by 100+ distributors and shop owners across India."
    },{
        img:'/quality.png',
        heading:"Consistent Quality",
        content:"Every product meets our durability and design standards."
    }, {
        img: '/truck.png',
        heading: "PAN India Delivery",
        content: "Quick dispatches to every corner of the country."
    },
] 

const WhyChooseUs = () => {
  return (
      <div className='w-full bg-gray-100 border px-4 pb-8  border-b-2 border-gray-200'>
          <SectionHeading heading='Why Choose Us' />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-8 flex-wrap'>
              {
                  whyChooseUsContent.map((item, idx) => <Card key={idx} img={item.img} content={item.content} heading={item.heading}  />)
              }
          </div>
      </div>
  )
}

export default WhyChooseUs