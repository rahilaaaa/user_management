import { fetchUser,  createUser, updateUser, deleteUser } from "../../components/Admin/adminThunks";
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    users : [],
    error : null,
    loading : false
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    extraReducers : (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })

            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload)
            })

            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id)
                if(index !== -1) state.users[index] = action.payload
            })

            .addCase(deleteUser.fulfilled, (state,action) => {
                state.users = state.users.filter((user) => user.id !== action.payload)
            })


    }
})

export default adminSlice.reducer