"use client"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

const MobileMenu = () => {
  const [mobileMenuOpen , setMobileMenuOpen] = useState(false)
  return (
    <div>
      {!mobileMenuOpen && 
      <Button onClick={() => setMobileMenuOpen(true)}>
        < Menu />
      </Button>
      }
    
      {mobileMenuOpen && 
        <motion.div 
          animate={{ x: [100,0]} }
          exit={{ x: [0,-100] }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className="w-screen h-screen absolute top-0 right-0 bg-white z-50">
        <div className="flex justify-end p-4">
          <Button onClick={() => setMobileMenuOpen(false)}>
              <X/>
          </Button>
        </div>
          <motion.div className="flex flex-col items-center">
            <div className="active:bg-black text-2xl py-4  border-b border-gray-300 border-t w-full text-center hover:bg-black hover:text-white hover:font-bold cursor-pointer transition-all duration-300 ease-in-out">
              <Link href={"/"} className="w-full hover:text-white">Home</Link>
          </div>
            <div className="hover:font-bold hover:bg-black hover:text-white text-2xl py-4  border-b border-gray-300 w-full text-center cursor-pointer transition-all duration-300 ease-in-out">
              <Link href="/products" className="w-full hover:text-white">Products</Link>
          </div>
            <div className="hover:font-bold hover:bg-black hover:text-white text-2xl py-4  border-b border-gray-300 w-full text-center cursor-pointer transition-all duration-300 ease-in-out">
              <Link href="/about" className="w-full hover:text-white">About</Link>
          </div> 
        </motion.div>
      </motion.div>}
    </div>
  )
}

export default MobileMenu