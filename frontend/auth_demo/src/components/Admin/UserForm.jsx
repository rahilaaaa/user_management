function UserForm({ onSubmit, form, onChange, handleCancel, isEdit, errors }) { 
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-wrap items-start gap-4 mb-6"
    >
      {/* Username */}
      <div className="flex-1 min-w-[150px]">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors?.username && (
          <p className="text-red-600 text-sm mt-1">{errors.username}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex-1 min-w-[200px]">
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors?.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Submit Button */}
       <button
        type="submit"
        className={`px-4 py-2 rounded-xl font-semibold text-grey transition flex items-center gap-2 ${
          isEdit ? "bg-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isEdit ? "update " : "➕ Add"}
      </button>

      {/* Cancel Button (if editing) */}
      {isEdit && (
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 rounded-xl font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      )}
    </form>
  )
}

export default UserForm
