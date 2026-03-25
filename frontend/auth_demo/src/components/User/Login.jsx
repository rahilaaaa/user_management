import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setError, setUser } from "../../features/user/userSlice"
import api from "../../api/axios"
import { useNavigate } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai" 

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector((state) => state.user.error)
  const [form, setForm] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false) 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    dispatch(setError(null))
    try {
      const res = await api.post("/login/", form)
      const { access, refresh } = res.data

      localStorage.setItem("access", access)
      localStorage.setItem("refresh", refresh)

      const { data } = await api.get("/profile/")
      dispatch(setUser(data))

      if (data.is_staff) {
        navigate("/admin/users")
      } else {
        navigate("/")
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const message =
          err.response.data.detail ||
          err.response.data.non_field_errors?.[0] ||
          "Login failed. Check credentials."
        dispatch(setError(message))
      } else {
        dispatch(setError("Network error. Try again."))
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} 
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
          >
        {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl font-semibold text-white transition ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
