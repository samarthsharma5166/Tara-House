import React from 'react'
import SectionHeading from '../SectionHeading'
// import ChipScroll from '../ChipScroll'
import Masonary from '../Masonary'

const Products = () => {
  return (
    <div className='w-full bg-gray-100 border px-4 pb-8  border-b-2 border-gray-200'>
        <SectionHeading heading='Our Products' />
        {/* <ChipScroll/> */}
        <Masonary/>
    </div>
  )
}

export default Products