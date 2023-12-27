import {createSlice} from '@reduxjs/toolkit'
import {fetchUserMessages} from "../api/messages"

const messagesDataSlice = createSlice({
    name: 'messagesData',
    initialState: {
        "messagesInfo": []
    },
    reducers: {

    },
    extraReducers: {
        [fetchUserMessages.fulfilled]: (state, action) => {
            state.messagesInfo = action.payload;

            // console.log(state.messages);
        },
    }
})

export default messagesDataSlice