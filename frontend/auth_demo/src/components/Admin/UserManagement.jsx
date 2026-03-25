import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createUser, deleteUser, fetchUser, updateUser } from "./adminThunks"
import UserForm from "./UserForm"
import UserList from "./UserList"
import ConfirmModal from "./DeleteModal"

function UserManagement() {
  const dispatch = useDispatch()
  const { users, loading, error } = useSelector((state) => state.admin)
  const [form, setForm] = useState({ username: "", email: "" })
  const [editUserId, setEditUserId] = useState(null)
  const [search, setSearch] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [deleteId, setDeleteId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)


  useEffect(() => {
    const token = localStorage.getItem("access")
    if (token) {
      dispatch(fetchUser())
    }
  }, [dispatch])

  useEffect(()=>{
    const delay = setTimeout(()=>{
      if(search.trim() !== ""){
        dispatch(fetchUser(search))
      }
      else{
        dispatch(fetchUser())
      }
    }, 800)

    return() => clearInterval(delay)
  }, [search, dispatch])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    // dispatch(fetchUser(e.target.value))
    setForm({ username: "", email: "" })
  }

  const handleFormChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleCreate = async (e) => {
  e.preventDefault()
  setFormErrors({})  
  try {
    await dispatch(createUser(form)).unwrap()
    setForm({ username: "", email: "" })
  } catch (err) {
    // err should be an object like {username: ["This field is required"], email: ["Invalid email"]}
    const firstErrors = {}
    Object.entries(err).forEach(([key, value]) => {
      firstErrors[key] = Array.isArray(value) ? value[0] : value
    })
    setFormErrors(firstErrors)
  }
}

 

const handleUpdate = async (e) => {
  e.preventDefault()
  setFormErrors({})
  try {
    await dispatch(updateUser({ id: editUserId, user: form })).unwrap()
    setEditUserId(null)
    setForm({ username: "", email: "" })
  } catch (err) {
    const firstErrors = {}
    Object.entries(err).forEach(([key, value]) => {
      firstErrors[key] = Array.isArray(value) ? value[0] : value
    })
    setFormErrors(firstErrors)
  }
}

  const handleEdit = (user) => {
    setEditUserId(user.id)
    setForm({ username: user.username, email: user.email })
  }

  
  const handleDelete = (id) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const confirmDelete = () => {
    dispatch(deleteUser(deleteId))
    setIsModalOpen(false)
    setDeleteId(null)
  }

  const handleCancel = () => {
    setEditUserId(null)
    setForm({ username: "", email: "" })
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Admin User Management
        </h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={handleSearch}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Form */}
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          {editUserId ? "Edit User" : "Add User"}
        </h3>
        <UserForm
          form={form}
          onChange={handleFormChange}
          isEdit={!!editUserId}
          onSubmit={editUserId ? handleUpdate : handleCreate}
          handleCancel={handleCancel}
          errors={formErrors}
        />

        {loading && (
          <div className="mt-4 text-center text-gray-500">Loading...</div>
        )}
        {error && (
          <div className="mt-4 text-center text-red-600 font-medium">{error}</div>
        )}

        <div className="mt-6">
          <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <ConfirmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this user?"
      />
      </div>
    </div>
  )
}

export default UserManagement
