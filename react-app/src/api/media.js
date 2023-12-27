import {createAsyncThunk} from '@reduxjs/toolkit'
import {HOST} from "./config"

export const updateAvatar = createAsyncThunk (
'updateAvatar',
    async function (data, {rejectWithValue}) {
        try {
            let {id, token, avatar} = data

            let formData = new FormData();
            formData.append('avatar', avatar);

            let url = `http://${HOST}:8000/messenger/api/v1/users/${id}`
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
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