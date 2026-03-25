import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


function PrivateRouter({children, adminOnly=false}){
    const {user, isAuthenticated} = useSelector((state)=>state.user)

    if(!isAuthenticated || !user) 
        return <Navigate to='/login'/>
    
    if(adminOnly && !user.is_staff) 
        return <Navigate to='/profile'/>
    
    if(!adminOnly && user.is_staff ) 
        return <Navigate to='/admin/users'/>
    

    return children
}

export default PrivateRouter