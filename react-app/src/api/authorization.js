import {createAsyncThunk} from '@reduxjs/toolkit'
import {HOST} from "./config"

export const authorize = createAsyncThunk (
'authorize',
    async function (data, {rejectWithValue}) {
        try {
            let {login, password} = data
            let requestBody = {
                username: login,
                password: password
            }
            let url = `http://${HOST}:8000/messenger/auth/token/login`
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