import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice"
import adminReducer from "../features/admin/adminSlice"


const store =  configureStore({
    reducer: {
        admin: adminReducer,
        user: userReducer
    }
})

export default store