import Sidebar from "@/components/Sidebar"
import Nav from "@/components/Nav"
import { useAppSelector } from "@/hooks/hook"
import ProudctPage from "./ProudctPage"

const HomeScreen = () => {
  const { isOpen } = useAppSelector(state => state.modal)

  return (
    <div className="w-full h-full container mx-auto bg-foreground">
      <Nav />
      {isOpen && <Sidebar />}
      <ProudctPage /> {/* renders ProudctPage, CompanyPage, etc. */}
    </div>
  )
}

export default HomeScreen
