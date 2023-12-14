import {createAsyncThunk} from '@reduxjs/toolkit'

export const authorize = createAsyncThunk (
'items/authorize',
    async function (data, {rejectWithValue}) {
        try {
            let {login, password} = data
            let requestBody = {
                username: login,
                password: password
            }
            // console.log(requestBody)
            let url = 'http://127.0.0.1:8000/messenger/auth/token/login'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            })
            if (!response.ok) {
                throw new Error("Some error occured")
            }
            let res = await response.json()
            console.log("res: ", res)
            console.log(res.auth_token)
            return res
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)