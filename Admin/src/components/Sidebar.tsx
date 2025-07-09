import { useAppDispatch } from "@/hooks/hook";
import {  toggleModal } from "@/redux/modal/modalSlice"; // ✅ create this if not exist
import { IoIosClose } from "react-icons/io";
import { Link, useNavigate, } from "react-router-dom";
import { Button } from "./ui/button";
import axiosInstance from "@/helper/axiosInstance";
import { toast } from "sonner";

const LinkArr = [
    { path: "/", text: "Products" },
    { path: "/company", text: "Company" },
    { path: "/category", text: "Category" },
];

const Sidebar = () => {
    const dispatch = useAppDispatch();
    // const location = useLocation();
    const navigate = useNavigate();
    async function handleLogout (){
        console.log("first")
        await axiosInstance.get("/user/logout").then( ()=>{
            localStorage.clear()
            toast.success("Logout Successfully")
            navigate("/login")
        });
    }

    return (
        <div className="w-xs overflow-y-scroll z-50 h-full bg-foreground shadow shadow-white absolute top-0 left-0">
            <div
                onClick={() => dispatch(toggleModal())}
                className="text-muted-foreground hover:text-white transition-color text-4xl flex justify-end"
            >
                <IoIosClose />
            </div>
            <div className="flex flex-col justify-between relative h-full">
                <div className="flex flex-col">
                    {LinkArr.map((item, index) => (
                        <Link
                            to={item.path}
                            key={index}
                            className="text-white border-b p-4 border-muted-foreground text-2xl font-medium text-center"
                            onClick={() => dispatch(toggleModal())} // ✅ CLOSE sidebar immediately
                        >
                            {item.text}
                        </Link>
                    ))}
                </div>
                <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
};

export default Sidebar;
