import {createAsyncThunk} from '@reduxjs/toolkit'

export const authorize = createAsyncThunk (
'authorize',
    async function (data, {rejectWithValue}) {
        try {
            let {login, password} = data
            let requestBody = {
                username: login,
                password: password
            }
            let url = 'http://127.0.0.1:8000/messenger/auth/token/login'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            })
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) })
            }
            let res = await response.json()
            return res
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)