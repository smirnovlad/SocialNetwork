import {createSlice} from '@reduxjs/toolkit'
import {fetchAuthorizedUserInfo} from "../api/userInfo"
import {authorize} from "../api/authorization"

const authorizedUserInfoSlice = createSlice({
    name: 'authorizedUserInfo',
    initialState: {
        id: '',
        username: '',
        first_name: '',
        last_name: '',
        birth_date: '',
        hometown: '',
        token: null,
        status: null,
        error: null
    },
    reducers: {
    },
    extraReducers: {
        [fetchAuthorizedUserInfo.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchAuthorizedUserInfo.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.id = action.payload.id
            state.username = action.payload.username
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.birth_date = action.payload.bornAt
            state.hometown = action.payload.homeTown
        },
        [fetchAuthorizedUserInfo.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        [authorize.fulfilled]: (state, action) => {
            state.token = action.payload.auth_token
        }
    }
})

// export const {logIn} = authorizedUserInfoSlice.actions
export default authorizedUserInfoSlice