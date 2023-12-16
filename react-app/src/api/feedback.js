import {createAsyncThunk} from '@reduxjs/toolkit'
import store from '../store/store'

export const fetchFeedback = createAsyncThunk(
    'fetchFeedback',
    async function (_, {rejectWithValue}) {
        try {
            let url = `http://127.0.0.1:8000/messenger/api/v1/feedback`
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Error')
            }
            const data = await response.json()
            console.log("DATA: ", data)
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)