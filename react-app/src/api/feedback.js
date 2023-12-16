import {createAsyncThunk} from '@reduxjs/toolkit'

export const fetchFeedback = createAsyncThunk(
    'fetchFeedback',
    async function (_, {rejectWithValue}) {
        try {
            let url = `http://127.0.0.1:8000/messenger/api/v1/feedback`
            const response = await fetch(url)
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

export const postReview = async function(data) {
    let {token, review} = data
    let url = `http://127.0.0.1:8000/messenger/api/v1/feedback/`
    let requestBody = {
        text: review
    }
    const response = await fetch(url, {
        method: 'POST',
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
}