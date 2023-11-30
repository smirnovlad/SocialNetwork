import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk(
    'items/fetchData',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch('http://127.0.0.1:8000/messenger/api/v1/users')
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

const authorizationDataSlice = createSlice({
    name: 'authorizationData',
    initialState: {
        username: '',
        password: '',
        status: null,
        error: null
    },
    reducers: {
        logIn(state, action) {
            state.username = action.payload.login;
            state.password = action.payload.password;
        }
    },
    extraReducers: {
        [fetchData.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchData.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.status = 'resolved'
            state.username = 'smirnov'
        },
        [fetchData.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        }
    }
})

export const {logIn} = authorizationDataSlice.actions
export default authorizationDataSlice