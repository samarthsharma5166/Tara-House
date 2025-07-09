"use client";

import React, { useRef } from 'react'
import TestimonialCard from '../TestimonialCard'
import SectionHeading from '../SectionHeading'
import { motion } from 'framer-motion'

const reviews = [
  {
    review: "Tara Crockery House has been our go-to supplier for over 5 years. Their quality and pricing are unmatched, and deliveries are always on time. Our customers love the designs!” — Ankit Mehra, Mehra Crockery Store, Delhi"
  },
  {
    review: "As a wholesaler, I’ve worked with many vendors, but Tara Crockery stands out. Their Khurja-based factory ensures they’re never out of stock, and their service is top-notch. — Pooja Jain, Distributor, Jaipur"
  },
  {
    review: "Tara Crockery House has been our go-to supplier for over 5 years. Their quality and pricing are unmatched, and deliveries are always on time. Our customers love the designs!” — Ankit Mehra, Mehra Crockery Store, Delhi"
  }
]

const Testimonials = () => {
  return (
    <div className="relative w-full  bg-gray-100 border-b-2 pb-8 border-gray-200 overflow-hidden">
      <SectionHeading heading="Testimonials" />

      {/* Left Shadow */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-100 via-gray-100/70 to-transparent z-10 pointer-events-none" />

      {/* Right Shadow */}
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-100 via-gray-100/70 to-transparent z-10 pointer-events-none" />

      {/* Moving Cards */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20, // slow down a little for testimonials
          ease: "linear",
        }}
        className="flex gap-10 w-max py-5"
      >
        {reviews.concat(reviews).map((item, idx) => (
          <TestimonialCard key={idx} review={item.review} />
        ))}
      </motion.div>
    </div>
  )
}

export default Testimonials
