import {createAsyncThunk} from '@reduxjs/toolkit'
import {HOST} from "./config"

export const register = createAsyncThunk (
'register',
    async function (data, {rejectWithValue}) {
        try {
            console.log("reg data: ", data)

            let requestBody = {
                first_name: data.first_name,
                last_name: data.last_name,
                username: data.username,
                password: data.password,
                bornAt: data.birth_date,
                homeTown: data.hometown,
                re_password: data.confirm_password
            }
            // // console.log(requestBody)
            let url = `http://${HOST}:8000/messenger/api/v1/auth/users/`
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