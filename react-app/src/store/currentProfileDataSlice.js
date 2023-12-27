import {createSlice} from '@reduxjs/toolkit'
import {fetchUserInfo, fetchAuthorizedUserInfo, updateUserSettings} from "../api/userInfo"

const currentProfileDataSlice = createSlice({
    name: 'profileData',
    initialState: {
        "id": '',
        "first_name": '',
        "last_name": '',
        "avatar": null,
        "hometown": '',
        "birth_date": ''
    },
    reducers: {

    },
    extraReducers: {
        [fetchAuthorizedUserInfo.fulfilled]: (state, action) => {
            state.id = action.payload.id
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.avatar = action.payload.avatar
            state.hometown = action.payload.homeTown
            state.birth_date = action.payload.bornAt
        },
        [fetchUserInfo.fulfilled]: (state, action) => {
            state.id = action.payload.id
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.avatar = action.payload.avatar
            state.hometown = action.payload.homeTown
            state.birth_date = action.payload.bornAt
        },
        [updateUserSettings.fulfilled]: (state, action) => {
            state.hometown = action.payload.homeTown
            state.birth_date = action.payload.bornAt
        },
    }
})

export default currentProfileDataSlice