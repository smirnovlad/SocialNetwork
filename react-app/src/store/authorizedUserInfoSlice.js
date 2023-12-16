import {createSlice} from '@reduxjs/toolkit'
import {fetchAuthorizedUserInfo, updateUserSettings} from "../api/userInfo"
import {authorize} from "../api/authorization"

const authorizedUserInfoSlice = createSlice({
    name: 'authorizedUserInfo',
    initialState: {
        id: null,
        username: '',
        first_name: '',
        last_name: '',
        friends: [],
        birth_date: '',
        hometown: '',
        token: null,
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
            state.friends = action.payload.friends
            state.birth_date = action.payload.bornAt
            state.hometown = action.payload.homeTown
        },
        [fetchAuthorizedUserInfo.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        [authorize.fulfilled]: (state, action) => {
            state.token = action.payload.auth_token
        },
        [updateUserSettings.fulfilled]: (state, action) => {
            state.hometown = action.payload.homeTown
            state.birth_date = action.payload.bornAt
        },
    }
})

// export const {logIn} = authorizedUserInfoSlice.actions
export default authorizedUserInfoSlice