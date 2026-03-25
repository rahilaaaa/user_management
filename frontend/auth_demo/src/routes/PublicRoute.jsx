import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PublicRoute({ children }){
    const {user, isAuthenticated} = useSelector((state) => state.user)
    
    return isAuthenticated && user ? 
        user.is_staff ? <Navigate to='/admin/users'/> : <Navigate to='/' />
    : children
    
}

export default PublicRoute