import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { Logout, setUser } from "../../features/user/userSlice";

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleLogout = async () => {
  try {
    await api.post("/logout/");
  } catch (err) {
    console.error("Logout failed:", err);
  } finally {
    dispatch(Logout());
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  }
};


  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4">
      <div className="flex items-center gap-6 font-semibold text-gray-700 text-lg">
        <Link to="/" className="hover:text-blue-600 transition">
          App
        </Link>
        {user && !user.is_staff && (
          <Link
            to="/profile"
            className="hover:text-blue-600 transition"
          >
            Profile
          </Link>
        )}
      </div>

      <div className="flex items-center gap-6 font-medium text-gray-700">
        {user ? (
          <>
            <span className="text-gray-700 font-medium">
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="hover:text-blue-600 transition"            >
              Logout
            </button>
          </>
        ) : (
          <>
           <Link
                to="/login"
                className="hover:text-blue-600 transition"              >
                Login
              </Link>

            <Link
              to="/register"
                className="hover:text-blue-600 transition"            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
