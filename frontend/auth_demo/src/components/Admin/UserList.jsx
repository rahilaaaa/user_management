function UserList({ users, onEdit, onDelete }) {
  // Filter normal users only
  const normalUsers = users?.filter(user => !user.is_staff);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-gray-700 font-semibold">ID</th>
            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Username</th>
            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Email</th>
            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Admin</th>
            <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {normalUsers && normalUsers.length > 0 ? (
            normalUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-3 text-gray-700">{user.id}</td>
                <td className="px-6 py-3 text-gray-800">{user.username}</td>
                <td className="px-6 py-3 text-gray-800">{user.email}</td>
                <td className="px-6 py-3 text-gray-700">{user.is_staff ? "Yes" : "No"}</td>
                <td className="px-6 py-3 flex gap-2">
                       <span
                    onClick={() => onEdit(user)}
                    className="cursor-pointer text-blue-500 hover:text-blue-700 transition text-lg"
                    title="Edit"
                  >
                    edit
                  </span>
                  <span
                    onClick={() => onDelete(user.id)}
                    className="cursor-pointer text-red-500 hover:text-red-700 transition text-lg"
                    title="Delete"
                  >
                    delete
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No normal users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList;
