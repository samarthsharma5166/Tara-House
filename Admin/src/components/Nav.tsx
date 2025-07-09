import { useAppDispatch } from "@/hooks/hook";
import { toggleModal } from "@/redux/modal/modalSlice";
import { RiMenu4Fill } from "react-icons/ri";
const Nav = () => {
  const dispatch = useAppDispatch();
  return (
    <nav className="w-full h-[60px] border-accent-foreground border-b text-white px-4 sm:px-0">
      <div className="flex justify-between items-center h-full">
        <div onClick={() => dispatch(toggleModal())}>
          <RiMenu4Fill className="text-2xl cursor-pointer hover:text-cyan-500 hover:scale-105 transition-colors duration-300"/>
        </div>
        <h4 className="font-bold text-2xl bg-gradient-to-b from-cyan-500 to-blue-500 bg-clip-text text-transparent">Admin</h4>
      </div>
      
    </nav>
  )
}

export default Nav