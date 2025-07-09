
import Image from "next/image";
import SectionHeading from "../SectionHeading"

const FooterSection = () => {
  const style = "text-[32px] p-2 pb-2 text-center alegreya-sans-bold text-white";
  return (
    <footer className="bg-black text-white px-4 pb-8 w-full">
      <SectionHeading heading="Contact Us" style={style}/>
      <div className="flex flex-col md:flex-row gap-4 md:items-center items-start  md:justify-between">
        {/* left Section */}
        <div>
          {/* logo */}
          <div>
            <h1 className="text-2xl text-white font-bold">Tara Ceramics</h1>
            <p className="text-[#987D25] text-xs -my-1">Perfect Crockery for Everyday Moments</p>
          </div>
          {/* content */}
          <div className="mt-5 md:max-w-96 w-full">
            <h3 className="text-[17px] workSansMedium font-medium">Let's Start a Conversation</h3>
            <p className="text-[16px] workSansLight tracking-widest ">Looking to place a bulk crockery order? Want a quote or catalog? We're happy to help.</p>
          </div>
        {/* contact */}
        <div className="mt-5 md:max-w-96 w-full">
          <h3 className="text-[17px] workSansMedium font-medium">Tara Crockery House</h3>
          <p className="text-[16px] workSansLight tracking-widest">Location: Khurja Junction Road,Uttar Pradesh</p>
            <p className="text-[16px] workSansLight tracking-widest">Phone: +91 123456789</p>
            <p className="text-[16px] workSansLight tracking-widest">Email: 0PwKg@example.com</p>
        </div>
        </div>
        {/* Right Section */}
        <div>
          <div className="flex gap-4 md:gap-2 mt-2 md:mt-0">
            <Image src={"/Facebook.svg"} alt="whatsapp" width={40} height={40}></Image>
            <Image src={"/LI.svg"} alt="whatsapp" width={40} height={40}></Image>
            <Image src={"/WhatsApp.svg"} alt="whatsapp" width={40} height={40}></Image>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection