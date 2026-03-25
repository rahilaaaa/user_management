import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name: "user",
        initialState: {
            user: null,
            loading: false,
            error: null,
            isAuthenticated: false

        },
        reducers:{
            setUser: (state, action) => {
                state.user = action.payload, 
                state.isAuthenticated = !!action.payload
            },
            setLoading: (state, action) => {state.loading = action.payload},
            setError: (state, action) => {state.error = action.payload},
            Logout: (state) => {
                state.user = null,
                state.isAuthenticated=false
            }
        }
    }
)
export const {setUser, setLoading, setError, Logout} = userSlice.actions
export default userSlice.reducer