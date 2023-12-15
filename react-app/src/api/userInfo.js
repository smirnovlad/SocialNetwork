import {createAsyncThunk} from '@reduxjs/toolkit'
import store from '../store/store'

export const fetchAuthorizedUserInfo = createAsyncThunk(
    'fetchAuthorizedUserData',
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

const fetchUserInfoHelper = async function(id) {
    let url = `http://127.0.0.1:8000/messenger/api/v1/users/${id}`
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Error')
    }
    return await response.json()
}

export const fetchUserInfo = createAsyncThunk(
    'fetchUserData',
    async function (id, {rejectWithValue}) {
        try {
            return await fetchUserInfoHelper(id)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchUserListInfo = async function (friends) {
    let friendsInfo = []
    for (const friend_id of friends) {
        let response = await fetchUserInfoHelper(friend_id).then((data) => {
            friendsInfo.push({
                name: data.first_name + " " + data.last_name,
                id: data.id
            })
        })
    }
    return friendsInfo
}

export const updateUserSettings = createAsyncThunk(
    'updateUserSettings',
    async function (data, {rejectWithValue}) {
        try {
            console.log("UPDATE USER SETTINGS")
            let {token, id, birthDate, hometown} = data;
            let requestBody = {
                bornAt: birthDate,
                homeTown: hometown
            }
            console.log("request body: ", requestBody)
            let url = `http://127.0.0.1:8000/messenger/api/v1/users/${id}`
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(requestBody)
            })
            console.log("RESPONSE: ", response)
            if (!response.ok) {
                throw new Error('Error')
            }
            const res = await response.json()
            return res
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)