import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/common/Navbar'
import Login from './components/User/Login'
import Register from './components/User/Register'
import PrivateRouter from './routes/PrivateRoute'
import Profile from './components/User/Profile'
import UserManagement from './components/Admin/UserManagement'
import PublicRoute from './routes/PublicRoute'
import Home from './components/User/Home'
import { useDispatch } from 'react-redux'
import api from './api/axios'
import { setError, setUser } from './features/user/userSlice'
import { useEffect } from 'react'





function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    const token = localStorage.getItem('access')
     if(token){ 
      api.get('/profile/').then((res)=>{
        dispatch(setUser(res.data))
      })
      .catch(()=>{
        dispatch(setError("session expired please login again"))
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
      })
    }
  }, [dispatch])

  return (
   <div>
    <Navbar/>
    <Routes>
      <Route path='/' element={
        <PrivateRouter>
          <Home/>
        </PrivateRouter>}/>

      <Route path='/login' element={
        <PublicRoute>
          <Login/>
        </PublicRoute>    
      }/>

      <Route path='/register' element={<Register/>}
      />
      <Route path='/profile'  element={
        <PrivateRouter >
          <Profile/>
        </PrivateRouter>
      }/>
      
       <Route
          path="/admin/users"
          element={
            <PrivateRouter adminOnly={true}>
              <UserManagement/>
            </PrivateRouter>
          }
        />

      <Route path='*' element={<Navigate to='/' />}/>
    </Routes>
   </div>
  )
}

export default App
