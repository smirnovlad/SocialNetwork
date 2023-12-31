import {createAsyncThunk} from '@reduxjs/toolkit'
import {HOST} from "./config"

export const fetchAuthorizedUserInfo = createAsyncThunk(
    'fetchAuthorizedUserData',
    async function (token, {rejectWithValue}) {
        try {
            let url = `http://${HOST}:8000/messenger/api/v1/auth/users/me`
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

export const fetchUserInfoHelper = async function(id) {
    let url = `http://${HOST}:8000/messenger/api/v1/users/${id}`
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

export const fetchUserListInfo = async function (users) {
    let usersInfo = []
    for (const user of users) {
        let data = await fetchUserInfoHelper(user)
        usersInfo.push({
            name: data.first_name + " " + data.last_name,
            id: data.id
        })
    }
    return usersInfo
}

export const fetchAllUsersInfo = createAsyncThunk(
    'fetchAllUsersData',
    async function (_, {rejectWithValue}) {
        try {
            let url = `http://${HOST}:8000/messenger/api/v1/users`
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Error')
            }
            const res = await response.json()

            let usersInfo = []
            for (let user of res) {
                usersInfo.push({
                    name: user.first_name + " " + user.last_name,
                    id: user.id
                })
            }

            return usersInfo
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateUserSettings = createAsyncThunk(
    'updateUserSettings',
    async function (data, {rejectWithValue}) {
        try {
            let {token, id, birthDate, hometown} = data;
            let requestBody = {
                bornAt: birthDate,
                homeTown: hometown
            }
            let url = `http://${HOST}:8000/messenger/api/v1/users/${id}`
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(requestBody)
            })
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

export const updateUserFriendList = createAsyncThunk(
    'updateUserFriendList',
    async function (data, {rejectWithValue}) {
        try {
            let {token, newFriendList} = data;
            let requestBody = {
                friends: newFriendList
            }
            let url = `http://${HOST}:8000/messenger/api/v1/auth/users/me/`
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(requestBody)
            })
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