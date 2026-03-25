import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../features/user/userSlice"
import api from "../../api/axios"

export default function Profile() {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [profileData, setProfileData] = useState(user)
  const [message, setMessage] = useState(null)

  const handleChangeImage = (e) => setImage(e.target.files[0])

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await api.get("/profile/")
        setProfileData(data)
        dispatch(setUser(data))
      } catch (error) {
        console.log("failed to fetch profile", error)
        setProfileData(null)
      }
    }
    fetchProfile()
  }, [dispatch])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!image) return
    const formdata = new FormData()
    formdata.append("profile_image", image)
    try {
      const { data } = await api.patch("/profile/", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setProfileData(data)
      dispatch(setUser(data))
      setMessage("Profile Image Uploaded.")
    } catch (err) {
      console.log("Upload failed", err)
      setMessage("Upload failed.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>

        {profileData?.profile_image ? (
          <img
            src={profileData.profile_image}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-4">
            No Image
          </div>
        )}

        <div className="text-center mb-4">
          <div className="text-gray-700 font-semibold">{profileData?.username}</div>
        </div>

        <div className="text-center mb-6">
          <div className="text-gray-700 font-semibold">{profileData?.email}</div>
        </div>

        <form onSubmit={handleUpload} className="flex flex-col items-center gap-4 w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Upload Profile Image
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-green-600 font-medium">{message}</div>
        )}
      </div>
    </div>
  )
}
