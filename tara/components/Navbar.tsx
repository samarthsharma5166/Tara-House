// import {  Search } from "lucide-react"
import Logo from "./Logo"
import { Button } from "./ui/button"
import Link from 'next/link'
import MobileMenu from "./MobileMenu"
import SearchCompo from "./Search"

const Navbar = () => {
  return (
    <div className="w-screen min-h-10 flex items-center justify-between sm:justify-normal gap-2 border-b border-gray-200 px-4">
      <div className=" h-full z-50 p-4">
        <Logo/>
      </div>
      <div className="hidden w-full md:block p-2">
        {/* links and search bar */}
        <div className="flex flex-grow items-center justify-between gap-4">
          <SearchCompo/>
          <div className="flex items-center gap-6 text-sm tracking-widest font-light w-xs justify-evenly">
            <div className="visited:font-extrabold hover:font-bold cursor-pointer transition-all duration-300 ease-in-out">
            <Link href={"/"} >Home</Link>
            </div>
            <div className="visited:font-extrabold hover:font-bold cursor-pointer transition-all duration-300 ease-in-out">
            <Link href="/product">Products</Link>
            </div>
            <div className="hover:font-bold cursor-pointer transition-all duration-300 ease-in-out">
            <Link href="/about" >About</Link>
            </div>
          </div>


          <div className="flex items-center justify-end gap-4 w-xs">
            <Button variant="outline" className="hover:bg-black hover:text-white">Contact Us</Button>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <MobileMenu/>
          {/* <Menu /> */}
      </div>
    </div>
  )
}

export default Navbar