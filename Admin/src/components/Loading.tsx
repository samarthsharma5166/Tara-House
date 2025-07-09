import { FaSpinner } from "react-icons/fa";
const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center animate-spin '>
          <FaSpinner size={25} />
    </div>
  )
}

export default Loading