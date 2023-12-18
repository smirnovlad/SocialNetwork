import {createSlice} from '@reduxjs/toolkit'
import {authorize} from "../api/authorization"

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
        [authorize.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [authorize.fulfilled]: (state, action) => {
            state.status = 'resolved'
        },
        [authorize.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
            state.token = null
            console.log(state.error)
        }
    }
})

export const {logIn} = authorizationDataSlice.actions
export default authorizationDataSlice