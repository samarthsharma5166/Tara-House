import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl text-destructive">404 Not Found</h1>
        <Link to="/" className="text-2xl text-secondary flex flex-row space-x-4 items-center justify-center"> <span><ArrowLeft/></span> Go Home</Link>
    </div>
  )
}

export default NotFound