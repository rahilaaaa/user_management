import {createAsyncThunk} from "@reduxjs/toolkit"
import api from '../../api/axios'

export const fetchUser = createAsyncThunk(
    'admin/fetchUsers',
    async(search= "", thunkAPI)=>{
        const {rejectWithValue} = thunkAPI
        try{
            const {data} = await api.get('admin/users/', {
                params: search ? {search}: {},
            })
            console.log("fetch users data.....", data)
            return data
        }
        catch{
            return rejectWithValue("failed to fetch users")
        }
    }

)

export const createUser = createAsyncThunk(
    'admin/createUser', 
    async(user, {rejectWithValue}) =>{
        try{
            const {data} = await api.post('admin/users/', user)
            return data
        }
        catch{
            return rejectWithValue("Create failed")
        }
    }
)

export const updateUser = createAsyncThunk(
    'admin/updateUser',
    async({id, user}, {rejectWithValue}) =>{
        try{
            const {data} = await api.put(`/admin/users/${id}/`, user)
            return data
        }
        catch{
            return rejectWithValue("update failed")
        }
    }
)

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async(id, {rejectWithValue}) => {
        try{
            await api.delete(`/admin/users/${id}/`)
            return id 
        }
        catch{
            return rejectWithValue('deletion failed ')
        }
    }
)