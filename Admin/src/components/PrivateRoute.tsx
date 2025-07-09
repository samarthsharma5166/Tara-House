import { useAppSelector } from '@/hooks/hook'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const{signingIn} = useAppSelector((state)=>state.user)
  return (
    <div>
        {
            signingIn ? <Outlet/> : <Navigate to="/login" />
        }
    </div>
  )
}

export default PrivateRoute