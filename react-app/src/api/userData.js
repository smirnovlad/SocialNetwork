import {createAsyncThunk} from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk(
    'items/fetchData',
    async function (_, {rejectWithValue}) {
        try {
            let url = 'http://127.0.0.1:8000/messenger/api/v1/users'
            const response = await fetch(url, {
                headers: {'Authorization': 'Token 9819142f080a45a378e0267de6c1708ec507d2db'}
            })
            if (!response.ok) {
                throw new Error('Server is bad')
            }
            const data = await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)