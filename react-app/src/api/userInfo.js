import {createAsyncThunk} from '@reduxjs/toolkit'

export const fetchAuthorizedUserInfo = createAsyncThunk(
    'items/fetchData',
    async function (token, {rejectWithValue}) {
        try {
            let url = `http://127.0.0.1:8000/messenger/api/v1/auth/users/me`
            const response = await fetch(url, {
                headers: {'Authorization': `Token ${token}`}
            })
            if (!response.ok) {
                throw new Error('Error')
            }
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchUserInfo = createAsyncThunk(
    'items/fetchData',
    async function (id, {rejectWithValue}) {
        try {
            let url = `http://127.0.0.1:8000/messenger/api/v1/users/${id}`
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Error')
            }
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)