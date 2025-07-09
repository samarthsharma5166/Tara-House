import { Route, Routes } from "react-router-dom"
import LoginScreen from "./pages/LoginScreen"
import PrivateRoute from "./components/PrivateRoute"
import HomeScreen from "./pages/HomeScreen"
import CompanyPage from "./pages/CompanyPage"
import CategoryPage from "./pages/CategoryPage"
import NotFound from "./components/NotFound"

const App = () => {
  return (
    <div className="w-screen min-h-screen bg-foreground overflow-y-hidden">
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/category" element={<CategoryPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
